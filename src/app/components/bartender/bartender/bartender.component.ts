import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FirebaseService } from "src/app/servicios/firebase.service";
import { AngularFirestore } from "angularfire2/firestore";
import { PedidosService } from "src/app/servicios/pedidos.service";
import * as $ from "jquery";

@Component({
  selector: "app-bartender",
  templateUrl: "./bartender.component.html",
  styleUrls: ["./bartender.component.scss"],
})
export class BartenderComponent implements OnInit {
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
      .doc("bartender")
      .snapshotChanges()
      .subscribe((data: any) => {
        if (!data?.payload?.data().emitida) {
          this.activarNotificacion();
          this.db
            .collection("notificaciones")
            .doc("bartender")
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
    $("#content-msj").text("Tiene un nuevo pedido de bebida");

    setTimeout(() => {
      $("#notificacion-push").css("top", "-15%");
    }, 3000);
  }

  terminarPedido(numeroMesa) {
    this.pedidosService.changeOrderStatus(
      "pendienteBebida",
      false,
      `Mesa ${numeroMesa} Buenos Muchachos`
    );
    this.fireService.sendNotification(
      `Mesa ${numeroMesa} Buenos Muchachos`,
      "mozoBebida"
    );
    this.actualizarLista();
    this.quitModal();
  }
}
