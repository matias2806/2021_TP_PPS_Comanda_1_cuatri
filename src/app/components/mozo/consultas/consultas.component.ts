import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FirebaseService } from "src/app/servicios/firebase.service";

@Component({
  selector: "app-consultas",
  templateUrl: "./consultas.component.html",
  styleUrls: ["./consultas.component.scss"],
})
export class ConsultasComponent implements OnInit {
  @Output() volver: EventEmitter<any> = new EventEmitter<any>();
  mesas: any;
  consultaConfirmation: boolean = false;
  consultaMesa: any;
  respuestaConsulta: any;

  constructor(private fireService: FirebaseService) {}

  ngOnInit() {
    this.actualizarLista();
  }

  back() {
    this.volver.emit("home");
  }

  actualizarLista() {
    this.fireService.getClientQuery().then(
      (datos) => {
        console.log(datos);
        this.mesas = datos;
      } /*datos=>this.mesas=datos*/
    );
  }

  cerrarConsulta() {
    this.consultaMesa.consulta = "";
    this.consultaMesa.respuesta = this.respuestaConsulta;
    this.fireService.updateDoc(
      "mesas",
      `Mesa ${this.consultaMesa.numero} ReComiendo`,
      this.consultaMesa
    );
    this.fireService.sendNotification("", "clienteRespuesta");
    this.actualizarLista();
  }

  seleccionarMesa(mesa) {
    this.consultaConfirmation = true;
    this.consultaMesa = mesa;
    console.log(mesa);
  }
}
