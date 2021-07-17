import { Component, OnInit, Output, Input, EventEmitter } from "@angular/core";
import { QRScannerService } from "src/app/servicios/qrscanner.service";
import { FirebaseService } from "src/app/servicios/firebase.service";
import { PedidosService } from "src/app/servicios/pedidos.service";
import { UtilidadService } from "src/app/servicios/utilidad.service";
import { VibrationService } from "src/app/servicios/vibration.service";
import { Router } from "@angular/router";
import { AngularFirestore } from "angularfire2/firestore";
import * as $ from "jquery";

@Component({
  selector: "app-cliente",
  templateUrl: "./cliente.component.html",
  styleUrls: ["./cliente.component.scss"],
})
export class ClienteComponent implements OnInit {
  mesaPedido: string;
  currentUser;
  dataCurrentUser;
  mesaOcupada: string;
  estadoCliente: string = null;
  encuesta: boolean = false;
  pago: boolean;
  mesaParaPagar: any;
  opt: string;
  encuestaTerminada: boolean = false;
  clienteEnMesa: boolean = false;
  clienteEsperandoPedido: boolean = false;
  propina: number;

  constructor(
    private QRService: QRScannerService,
    private fireService: FirebaseService,
    private pedidoService: PedidosService,
    private utilidadService: UtilidadService,
    private vibrationService: VibrationService,
    private route: Router,
    private db: AngularFirestore
  ) {
    this.currentUser = fireService.getCurrentUser();

    if (!this.currentUser.isAnonymous) {
      fireService
        .getDBByDoc("cliente", this.currentUser.email)
        .then((data) => (this.dataCurrentUser = data));
      fireService
        .getClientInTable(this.currentUser.email)
        .then((data: any) => {
          console.log(data);
          if (!data) {
            this.clienteEnMesa = false;
          } else if (
            data[0].asignacion == "true" &&
            data[0].estado == "pendiente"
          ) {
            console.log(data[0].estado);
            this.clienteEnMesa = true;
            this.mesaPedido = data[0].nombre;
            this.estadoCliente = "enMesa";
          } else {
            console.log("aca");
            this.clienteEnMesa = true;
            this.clienteEsperandoPedido = true;
            this.mesaPedido = data[0].nombre;
            this.estadoCliente = "opts";
          }
        })
        .then(() => {
          if (!this.clienteEnMesa) {
            console.log("mesa? " + this.clienteEnMesa);
            this.fireService
              .getWaitingList(this.currentUser.email)
              .then((data: any) => {
                console.log("data? " + data);
                if (data != undefined) this.estadoCliente = "listaEspera";
                else {
                  this.clienteEnMesa = true;
                }
              });
          }
        });
    } else {
      fireService
        .getDBByDoc("clientesInvitados", this.currentUser.uid)
        .then((data) => (this.dataCurrentUser = data));

      fireService
        .getAnonymousClientInTable(this.currentUser.uid)
        .then((data: any) => {
          if (!data) {
            this.clienteEnMesa = false;
          } else if (
            data[0].asignacion == "true" &&
            data[0].estado == "pendiente"
          ) {
            this.clienteEnMesa = true;
            this.mesaPedido = data[0].nombre;
            this.estadoCliente = "enMesa";
          } else {
            this.clienteEsperandoPedido = true;
            this.mesaPedido = data[0].nombre;
            this.estadoCliente = "opts";
          }
        })
        .then(() => {
          if (!this.clienteEnMesa) {
            console.log("mesa? " + this.clienteEnMesa);
            this.fireService
              .getWaitingList(this.currentUser.email)
              .then((data: any) => {
                console.log("data? " + data);
                if (data != undefined) this.estadoCliente = "listaEspera";
                else {
                  this.clienteEnMesa = true;
                }
              });
          }
        });
    }
  }

  @Input() mesa: string;
  @Output() finalizarPropina: EventEmitter<any> = new EventEmitter<any>();
  mesaData: any;

  ngOnInit() {
    this.db
      .collection("notificaciones")
      .doc("clienteNoPago")
      .snapshotChanges()
      .subscribe((data: any) => {
        if (!data?.payload?.data().emitida) {
          console.log("aca");
          this.activarNotificacion();
          this.db
            .collection("notificaciones")
            .doc("clienteNoPago")
            .update({ emitida: true });
        }
      });

    this.fireService.getTable(this.mesa).then((data) => {
      this.mesaData = data;
    });
  }

  scanListaDeEspera() {
    this.QRService.scan().then((a: any) => {
      if (a.text == "listaDeEsperaReComiendo") {
        if (!this.currentUser.isAnonymous)
          this.fireService.createDocInDB(
            "listaEspera",
            this.currentUser.email,
            { ...this.dataCurrentUser, asignado: false }
          );
        else
          this.fireService.createDocInDB("listaEspera", "anonimo@anonimo.com", {
            ...this.dataCurrentUser,
            correo: "anonimo@anonimo.com",
          });

        this.estadoCliente = "listaEspera";
        this.fireService.sendNotification(
          this.currentUser.email ?? this.currentUser.uid,
          "metre"
        );
      } else {
        console.error("Primero debe ir a la lista de espera");
        this.utilidadService.textoMostrar(
          "#modal-error-text-p-general",
          "Primero debes anotarte a la lista de espera",
          "#modal-error-general",
          "#container-client"
        );
        this.vibrationService.error();
      }
    });
  }

  scanMesa() {
    let aux: any = this.currentUser.isAnonymous
      ? "anonimo@anonimo.com"
      : this.currentUser.email;
    this.QRService.scan().then((a: any) => {
      this.fireService.getWaitingList(aux).then((datos: any) => {
        if (datos != undefined) {
          this.fireService.getTable(a.text).then((data: any) => {
            if (this.estadoCliente == "listaEspera" && data != undefined) {
              if (!data.ocupada) {
                data.ocupada = true;
                data.asignacion = "true";
                data.cliente = this.dataCurrentUser;
                if (datos.mesaAsignada === a.text) {
                  this.fireService.updateDoc("mesas", a.text, data);
                  this.estadoCliente = "enMesa";
                  this.mesaOcupada = datos.mesaAsignada;
                }
                else {
                  this.utilidadService.textoMostrar(
                    "#modal-error-text-p-general",
                    "La mesa no es la asignada",
                    "#modal-error-general",
                    "#container-client"
                  );
                  this.vibrationService.error();
                }
              } else {
                console.error("mesa ocupada");
                this.utilidadService.textoMostrar(
                  "#modal-error-text-p-general",
                  "La mesa se encuentra ocupada",
                  "#modal-error-general",
                  "#container-client"
                );
                this.vibrationService.error();
              }
            } else if (this.estadoCliente == "encuesta") {
              this.estadoCliente = "opts";
            }
            else if (this.estadoCliente == "estadistica") {
              this.estadoCliente = "opts";
            }
            else {
              console.log("Codigo incorrecto");
            }
          });
        }
      });
    });
  }

  scanEncuesta() {
    this.QRService.scan().then((a: any) => {
      if (a.text == "Encuesta ReComiendo") {
        this.encuesta = true;
      }
    });
  }

  getPropina() {
    this.QRService.scan().then((a: any) => {
      switch (a.text) {
        case 'Excelente':
          this.propina = 20;
          break;
        case 'Muy bien':
          this.propina = 15;
          break;
        case 'Bien':
          this.propina = 10;
          break;
        case 'Regular':
          this.propina = 5;
          break;
        case 'Malo':
          this.propina = 0;
          break;
      }
    });

    /*if(this.propina > 0)
    {
      this.mesaData.pedido.porcentajePropina = `${this.propina}%`
      this.mesaData.pedido.propina = ((this.mesaData.pedido.total*this.propina) / 100);
      this.mesaData.pedido.totalConPropina = (this.mesaData.pedido.total + this.mesaData.pedido.propina);
    }
    else
    {
      this.mesaData.pedido.porcentajePropina = `${this.propina}%`
      this.mesaData.pedido.propina = this.propina
      this.mesaData.pedido.totalConPropina = this.mesaData.pedido.total;
    }*/
    this.mesaData.cliente.correo = "";
    this.fireService.updateDoc("mesas", this.mesaOcupada, this.mesaData);
  }

  pagar() {

    if (this.propina == null) {
      this.getPropina();
    }

    this.fireService
      .getTable(this.mesaOcupada ?? this.mesaPedido)
      .then((datos: any) => {
        datos.pagoPendiente = true;
        this.opt = "pagar";
        this.mesaParaPagar = datos;
        this.fireService.updateDoc(
          "mesas",
          this.mesaOcupada ?? this.mesaPedido,
          datos
        );
        this.fireService.sendNotification("", "mozoCuenta");
      });
  }

  irse() {
    this.pedidoService
      .isPaymentPending(this.mesaOcupada ?? this.mesaPedido)
      .then((a: any) => {
        if (!a.pagoPendiente) {
          this.fireService.removeFromWaitingList(this.currentUser.email);
          this.pago = true;
          this.opt = "";
          this.estadoCliente = "despedida";
          this.route.navigate(["login"]);
        } else {
          this.fireService.sendNotification("", "clienteNoPago");
          this.vibrationService.error();
        }
      });
  }

  finalizar($event) {
    console.log($event);
    //this.encuestaTerminada = true;
    this.estadoCliente = "opts";
    this.opt = "";
  }
  salir() {
    this.opt = undefined;
  }

  activarNotificacion() {
    $("#notificacion-push").css("top", "2%");
    $("#content-title").text("Estado pago");
    $("#content-msj").text("Aguarde un momento, ya recogeremos su pago.");

    setTimeout(() => {
      $("#notificacion-push").css("top", "-15%");
    }, 3000);
  }

  estadisticas() {
    console.log("TA");
    this.route.navigate(['estadisticas']);
  }
}
