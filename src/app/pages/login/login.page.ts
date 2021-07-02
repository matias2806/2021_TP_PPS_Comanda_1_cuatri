import { Component, OnInit } from "@angular/core";
import * as $ from "jquery";
import { FirebaseService } from "src/app/servicios/firebase.service";
import { Router } from "@angular/router";
import { VibrationService } from "src/app/servicios/vibration.service";
import { SpinnerService } from "src/app/servicios/spinner.service";
import { UtilidadService } from "src/app/servicios/utilidad.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  showBackdrop = true;
  mostrarFrmLogin: boolean = false;
  mostrarFrmInvitado: boolean = false;
  listado: any = [];
  email: string;
  pass: string;
  invitedPhoto;

  constructor(
    private fireService: FirebaseService,
    private vibrationService: VibrationService,
    private navegador: Router,
    private spinner: SpinnerService,
    private utilidadService: UtilidadService
  ) {}

  ngOnInit() {
    // this.spinner.activateFor("backdrop", 3000);
    this.getUsers();
  }

  focus(id) {
    document.getElementById(id).style.borderBottom =
      "1px solid rgb(36, 136, 202)";
  }

  noFocus(id) {
    document.getElementById(id).style.borderBottom = "1px solid ghostwhite";
  }

  mostrarLogin() {
    this.mostrarFrmLogin = !this.mostrarFrmLogin;

    if (this.mostrarFrmLogin == true) {
      $("#formUsuario").css("width", "100%");
      $("#formUsuario").css("height", "50%");
      $("#formUsuario").css("opacity", "1");
      $("#botonUsuario").attr("value", "Cerrar");
      $("#botonInvitado").css("display", "none");
      $(".usuarios").fadeIn();
      $(".contenedorLogin").css("background", "rgba(0, 0, 0, 0.6)");
    } else {
      $("#formUsuario").css("opacity", "0");
      setTimeout(() => {
        $("#formUsuario").css("height", "0%");
        $("#formUsuario").css("width", "0%");
        $("#botonUsuario").attr("value", "Usuario");
        $("#botonInvitado").css("display", "block");
        $(".usuarios").fadeOut();
        $(".contenedorLogin").css("background", "rgba(0, 0, 0, 0)");
      }, 100);
    }
  }

  mostrarInvitado() {
    this.mostrarFrmInvitado = !this.mostrarFrmInvitado;

    if (this.mostrarFrmInvitado == true) {
      $("#formInvitado").css("width", "100%");
      $("#formInvitado").css("height", "50%");
      $("#formInvitado").css("opacity", "1");
      $("#botonInvitado").attr("value", "Cerrar");
      $("#botonUsuario").css("display", "none");
      $(".contenedorLogin").css("background", "rgba(0, 0, 0, 0.6)");
    } else {
      $("#formInvitado").css("opacity", "0");
      setTimeout(() => {
        $("#formInvitado").css("height", "0%");
        $("#formInvitado").css("width", "0%");
        $("#botonInvitado").attr("value", "Invitado");
        $("#botonUsuario").css("display", "block");
        $(".contenedorLogin").css("background", "rgba(0, 0, 0, 0)");
      }, 100);
    }
  }

  loguear() {
    this.email = $("#correo").val();
    this.pass = $("#pass").val();

    if (this.validarCorreo() && this.validarClave()) {
      this.fireService
        .loginEmail(this.email, this.pass)
        .then((user) => {
          this.pass = "";
          $("#pass").val("");
          this.spinner.activateAndRedirect("backdrop", 3000, "home");
          console.log('loguea correctamente')
          this.navegador.navigate(['home']);
        })
        .catch((error) => {
          console.error(  );
          this.textoMostrar(error.code);
          this.vibrationService.error();
        });
    }
  }

  textoMostrar(msj) {
    switch (msj) {
      case "auth/user-not-found":
        $("#mensajeTexto").text("El E-Mail no fue encontrado");
        break;
      case "auth/argument-error":
        $("#mensajeTexto").text("E-Mail o contraseña incorrectos");
        break;
      case "auth/wrong-password":
        $("#mensajeTexto").text("La contraseña es incorrecta");
        break;
      case "auth/invalid-email":
        $("#mensajeTexto").text("El Email tiene un formato incorrecto");
        break;
      default:
        $("#mensajeTexto").text(msj);
        break;
    }

    this.fadeInAndOut();
  }
  fadeInAndOut() {
    $("#mensajeLogin").fadeIn();
    setTimeout(() => {
      $("#mensajeLogin").fadeOut();
    }, 2000);
  }

  validarCorreo(): boolean {
    let retorno = false;
    let regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    if (regex.test(this.email)) {
      retorno = true;
    } else if (this.email == "") {
      this.textoMostrar("Correo Requerido");
      this.vibrationService.error();
    } else {
      this.textoMostrar("El campo debe ser de tipo correo");
      this.vibrationService.error();
    }

    return retorno;
  }

  validarClave(): boolean {
    let retorno = false;

    if (this.pass == "") {
      this.textoMostrar("Contraseña Requerida");
      this.vibrationService.error();
    } else if (this.pass.length < 6) {
      this.textoMostrar("La clave debe ser mayor a 6 digitos");
      this.vibrationService.error();
    } else {
      retorno = true;
    }
    return retorno;
  }

  completar(email: string) {
    for (let usuario of this.listado) {
      if (email == usuario.correo) {
        $("#correo").val(usuario.correo);
        $("#pass").val(usuario.clave);
        break;
      }
    }
  }

  predeterminados(email: string, password: string) {
    $("#correo").val(email);
    $("#pass").val(password);
  }

  getUsers() {
    this.fireService.getDB("usuarios").then((users) => {
      this.listado = users;
    });
  }

  logInAsInvited() {
    let nombre = $("#nombreInvitado").val();

    if (nombre != "") {
      let id = nombre + "_" + this.utilidadService.getDateTime();
      let photoUrl;

      this.fireService.registerAsAnonymously().then((id: any) => {
        if (this.invitedPhoto != undefined) {
          this.fireService
            .uploadPhoto(this.invitedPhoto, `clientesInvitados/${id}`)
            .then((foto) => {
              photoUrl = foto;
              this.fireService.createDocInDB("clientesInvitados", id, {
                nombre: nombre,
                foto: photoUrl,
                id: id,
                correo: "anonimo@anonimo.com",
              });
              this.spinner.activateAndRedirect("backdrop", 3000, "home");
            });
        } else {
          photoUrl = "default";
          this.fireService.createDocInDB("clientesInvitados", id, {
            nombre: nombre,
            foto: photoUrl,
            id: id,
          });
          this.spinner.activateAndRedirect("backdrop", 3000, "home");
        }
      });
    } else {
      this.utilidadService.textoMostrar(
        "#mensajeTexto",
        "Campo nombre requerido",
        "#mensajeLogin",
        ""
      );
      this.vibrationService.error();
    }
  }

  selectPhotoInPhotolibrary() {
    this.fireService
      .choosePhotoLibrary()
      .then((foto) => (this.invitedPhoto = <string>foto));
  }
}
