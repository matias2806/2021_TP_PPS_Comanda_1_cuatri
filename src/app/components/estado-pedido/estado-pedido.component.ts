import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FirebaseService } from "src/app/servicios/firebase.service";

import { AngularFirestore } from "angularfire2/firestore";
import { PedidosService } from "src/app/servicios/pedidos.service";
import { UtilidadService } from "src/app/servicios/utilidad.service";
import { VibrationService } from "src/app/servicios/vibration.service";

@Component({
  selector: "app-estado-pedido",
  templateUrl: "./estado-pedido.component.html",
  styleUrls: ["./estado-pedido.component.scss"],
})
export class EstadoPedidoComponent implements OnInit {
  @Input() mesaOcupada: string = "Mesa 1 ReComiendo";
  @Input() mesaPedido: string = "Mesa 1 ReComiendo";
  @Output() volver: EventEmitter<any> = new EventEmitter<any>();
  mesa: any;
  estado: string;

  constructor(
    private fireService: FirebaseService,
    private db: AngularFirestore,
    private pedidosService: PedidosService,
    private utilidadService: UtilidadService,
    private vibrationService: VibrationService
  ) {}

  ngOnInit() {
    console.log(this.mesaOcupada)
    console.log(this.mesaPedido)
    this.db
      .collection("mesas")
      .doc(this.mesaOcupada ?? this.mesaPedido)
      .snapshotChanges()
      .subscribe((data) => this.traerMesa());
      
  }

  salir() {
    this.volver.emit(undefined);
  }

  traerMesa() {
    this.fireService
      .getTable(this.mesaOcupada ?? this.mesaPedido)
      .then((dato) => {
        console.log(dato);
        this.mesa = dato;
        this.estado = this.upperCaseToFirstUpperCase(
          this.mesa.estado.toLocaleUpperCase()
        );
      });
  }

  pedidoRecibido() {
    if (this.mesa.estado == "entregado") {
      this.pedidosService.changeOrderStatus(
        "estado",
        "recibido",
        this.mesaOcupada ?? this.mesaPedido
      );
    } else {
      this.utilidadService.textoMostrar(
        "#modal-error-text-p-general",
        "El mozo aón no entregó el pedido",
        "#modal-error-general",
        ".container-home"
      );
      this.vibrationService.error();
    }
  }

  upperCaseToFirstUpperCase(string: string) {
    let notFirstChar = string.substring(1, string.length).toLowerCase();
    string = string.substring(0, 1) + notFirstChar;
    console.log(string);
    return string;
  }
}
