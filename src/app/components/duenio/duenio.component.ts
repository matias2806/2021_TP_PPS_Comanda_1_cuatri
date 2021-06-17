import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import { FirebaseService } from "src/app/servicios/firebase.service";
import * as $ from "jquery";

@Component({
  selector: "app-duenio",
  templateUrl: "./duenio.component.html",
  styleUrls: ["./duenio.component.scss"],
})
export class DuenioComponent implements OnInit {
  solicitudes: boolean = false;
  redirect = "home";
  firstTime = 0;
  clientes: any;
  constructor(
    private db: AngularFirestore,
    private fireService: FirebaseService
  ) {}

  ngOnInit() {
    this.db
      .collection("notificaciones")
      .doc("dueño")
      .snapshotChanges()
      .subscribe((data: any) => {
        if (!data?.payload?.data().emitida) {
          this.activarNotificacion();
          this.db
            .collection("notificaciones")
            .doc("dueño")
            .update({ emitida: true });
        }
      });
  }

  verSolicitudes() {
    this.solicitudes = true;
  }
  activarNotificacion() {
    $("#notificacion-push").css("top", "2%");
    $("#content-title").text("Nuevo Usuario");
    $("#content-msj").text("Tiene un usuario nuevo pendiente de confirmación");

    this.fireService.getDisabledClient().then((datos) => {
      this.clientes = datos;

      if (this.clientes.length == 0) {
        document.getElementById("msj-solicitudes").innerHTML =
          "No hay solicitudes pendientes";
      }
    });

    setTimeout(() => {
      $("#notificacion-push").css("top", "-15%");
    }, 3000);
  }
}
