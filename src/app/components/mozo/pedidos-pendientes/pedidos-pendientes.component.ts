import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FirebaseService } from "src/app/servicios/firebase.service";
import { PedidosService } from "src/app/servicios/pedidos.service";

@Component({
  selector: "app-pedidos-pendientes",
  templateUrl: "./pedidos-pendientes.component.html",
  styleUrls: ["./pedidos-pendientes.component.scss"],
})
export class PedidosPendientesComponent implements OnInit {
  @Output() volver: EventEmitter<any> = new EventEmitter<any>();
  pedidos: any;
  mesaSeleccionadaComida: any;
  mesaSeleccionadaBebida: any;

  constructor(
    private fireService: FirebaseService,
    private pedidosService: PedidosService
  ) {
    this.actualizarLista();
  }

  ngOnInit() {}

  ngOnViewEnter() {
    this.actualizarLista();
  }

  back() {
    this.volver.emit("home");
  }

  actualizarLista() {
    this.pedidos = [];
    this.fireService.getDB("mesas").then((datos) => {
      this.pedidos = datos;
      for (let mesita of this.pedidos) {
        if (
          !mesita.pendienteBebida &&
          !mesita.pendienteComida &&
          mesita.estado == "en proceso"
        ) {
          this.pedidosService.changeOrderStatus(
            "estado",
            "terminado",
            `Mesa ${mesita.numero} Buenos Muchachos`
          );
        }
      }
    });
  }

  entregar(mesa) {
    this.pedidosService.changeOrderStatus(
      "estado",
      "entregado",
      `Mesa ${mesa} Buenos Muchachos`
    );
    this.actualizarLista();
  }

  terminado(mesa): boolean {
    let retorno: boolean = false;
    if (
      mesa.estado == "terminado" &&
      !mesa.pendienteBebida &&
      !mesa.pendienteComida
    ) {
      retorno = true;
    }

    return retorno;
  }
}
