import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FirebaseService } from "src/app/servicios/firebase.service";
import { AngularFirestore } from "angularfire2/firestore";
import { PedidosService } from "src/app/servicios/pedidos.service";
import * as $ from "jquery";

@Component({
  selector: "app-cocinero",
  templateUrl: "./cocinero.component.html",
  styleUrls: ["./cocinero.component.scss"],
})
export class CocineroComponent implements OnInit {
  @Output() volver: EventEmitter<any> = new EventEmitter<any>();
  consultas: any;
  mesaSeleccionada: any;
  firstTime = 0;

  constructor(
    private fireService: FirebaseService,
    private db: AngularFirestore,
    private pedidosService: PedidosService
  ) {
    this.actualizarLista();
  }

  ngOnInit() {
    this.db
      .collection("notificaciones")
      .doc("cocinero")
      .snapshotChanges()
      .subscribe((data: any) => {
        if (!data?.payload?.data().emitida) {
          this.activarNotificacion();
          this.db
            .collection("notificaciones")
            .doc("cocinero")
            .update({ emitida: true });
        }
      });
    this.actualizarLista();
  }

  back() {
    this.volver.emit("home");
  }

  actualizarLista() {
    this.fireService.getDB("mesas").then((datos) => {
      this.consultas = [];
      this.consultas = datos;
    });
  }

  displayModal(mesa: any) {
    (<HTMLInputElement>(
      document.querySelector(".ctn-lista-mesas")
    )).style.filter = "blur(5px)";
    this.mesaSeleccionada = mesa;
  }

  quitModal() {
    (<HTMLInputElement>(
      document.querySelector(".ctn-lista-mesas")
    )).style.filter = "none";
    this.mesaSeleccionada = null;
    this.actualizarLista();
  }

  activarNotificacion() {
    $("#notificacion-push").css("top", "2%");
    $("#content-title").text("Actualizacion pedido");
    $("#content-msj").text("Tiene un nuevo pedido de comida");

    setTimeout(() => {
      $("#notificacion-push").css("top", "-15%");
    }, 3000);
  }

  terminarPedido(numeroMesa) {
    this.pedidosService.changeOrderStatus(
      "pendienteComida",
      false,
      `Mesa ${numeroMesa} ReComiendo`
    );
    this.fireService.sendNotification(
      `Mesa ${numeroMesa} ReComiendo`,
      "mozoComida"
    );
    this.actualizarLista();
    this.quitModal();
  }
}
