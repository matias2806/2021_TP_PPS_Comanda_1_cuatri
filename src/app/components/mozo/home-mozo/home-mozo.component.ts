import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import * as $ from "jquery";

@Component({
  selector: "app-home-mozo",
  templateUrl: "./home-mozo.component.html",
  styleUrls: ["./home-mozo.component.scss"],
})
export class HomeMozoComponent implements OnInit {
  redirect = "home";

  firstTimeConsulta = 0;
  firstTimeComida = 0;
  firstTimeBebida = 0;

  constructor(private db: AngularFirestore) {}

  ngOnInit() {
    this.db
      .collection("notificaciones")
      .doc("mozoConsulta")
      .snapshotChanges()
      .subscribe((data: any) => {
        if (!data?.payload?.data().emitida) {
          this.activarNotificacionConsulta();
          this.db
            .collection("notificaciones")
            .doc("mozoConsulta")
            .update({ emitida: true });
        }
      });
    this.db
      .collection("notificaciones")
      .doc("mozoComida")
      .snapshotChanges()
      .subscribe((data: any) => {
        if (!data?.payload?.data().emitida) {
          this.activarNotificacionComida();
          this.db
            .collection("notificaciones")
            .doc("mozoComida")
            .update({ emitida: true });
        }
      });
    this.db
      .collection("notificaciones")
      .doc("mozoBebida")
      .snapshotChanges()
      .subscribe((data: any) => {
        if (!data?.payload?.data().emitida) {
          this.activarNotificacionBebida();
          this.db
            .collection("notificaciones")
            .doc("mozoBebida")
            .update({ emitida: true });
        }
      });
    this.db
      .collection("notificaciones")
      .doc("mozoComidaNueva")
      .snapshotChanges()
      .subscribe((data: any) => {
        if (!data?.payload?.data().emitida) {
          this.activarNotificacionComidaNueva();
          this.db
            .collection("notificaciones")
            .doc("mozoComidaNueva")
            .update({ emitida: true });
        }
      });
    this.db
      .collection("notificaciones")
      .doc("mozoCuenta")
      .snapshotChanges()
      .subscribe((data: any) => {
        if (!data?.payload?.data().emitida) {
          this.activarNotificacionCuenta();
          this.db
            .collection("notificaciones")
            .doc("mozoCuenta")
            .update({ emitida: true });
        }
      });
  }
  activarNotificacionConsulta() {
    $("#notificacion-push").css("top", "2%");
    $("#content-title").text("Nueva consulta");
    $("#content-msj").text("Tiene una nueva consulta");

    setTimeout(() => {
      $("#notificacion-push").css("top", "-15%");
    }, 3000);
  }
  activarNotificacionComida() {
    $("#notificacion-push").css("top", "2%");
    $("#content-title").text("Actualizacion pedido");
    $("#content-msj").text("Ya está la comida lista!");

    setTimeout(() => {
      $("#notificacion-push").css("top", "-15%");
    }, 3000);
  }

  activarNotificacionComidaNueva() {
    $("#notificacion-push").css("top", "2%");
    $("#content-title").text("Nuevo pedido");
    $("#content-msj").text("¡Hemos recibido un nuevo pedido!");

    setTimeout(() => {
      $("#notificacion-push").css("top", "-15%");
    }, 3000);
  }

  activarNotificacionBebida() {
    $("#notificacion-push").css("top", "2%");
    $("#content-title").text("Actualizacion pedido");
    $("#content-msj").text("Ya está la bebida lista!");

    setTimeout(() => {
      $("#notificacion-push").css("top", "-15%");
    }, 3000);
  }

  activarNotificacionCuenta() {
    $("#notificacion-push").css("top", "2%");
    $("#content-title").text("Actualizacion pedido");
    $("#content-msj").text("¡Un cliente ha solicitado la cuenta!");

    setTimeout(() => {
      $("#notificacion-push").css("top", "-15%");
    }, 3000);
  }
}
