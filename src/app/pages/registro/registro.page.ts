
import { Component, OnInit} from '@angular/core';
import { FirebaseService } from 'src/app/servicios/firebase.service';
import { UtilidadService } from 'src/app/servicios/utilidad.service';
import * as $ from 'jquery';
import { SpinnerService } from 'src/app/servicios/spinner.service';
import { Platform } from '@ionic/angular';
import { QRScannerService } from 'src/app/servicios/qrscanner.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { VibrationService } from 'src/app/servicios/vibration.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  nombre: string = "";
  apellido: string = "";
  correo: string = "";
  clave: string = "";
  dni: number;
  cuil: any;
  file: string;
  url: string;
  registro = false;
  perfil:string = "cliente";
  perfiles:string[] = ["Cocinero","Mozo","Dueño","Supervisor","Bartender", "Metre"];
  perfilSeleccionado:string = "cliente";
  
  constructor(private servicio : FirebaseService, private vibrationService:VibrationService,private s_utilidad : UtilidadService, private spinner : SpinnerService, private platform:Platform, private QRService:QRScannerService, private location : Location, private router : ActivatedRoute ) {
    /* this.platform.backButton.subscribeWithPriority(0, () => { //cuando apreto el boton volver de la pantalla de android, dejo de intentar scanear el codigo
      document.getElementsByTagName("body")[0].style.opacity = "1";
      QRService.destroy();
    }) */
      this.perfil = this.router.snapshot.params.perfil;
      console.log(this.perfil);
   }

  ngOnInit() {
  }

  focus(id) {
    document.getElementById(id).style.borderBottom = "1px solid rgb(36, 136, 202)";
  }

  noFocus(id) {
    document.getElementById(id).style.borderBottom = "1px solid ghostwhite";
  }

  registrar()
  {
    if(this.validarTipoEmpleado() && this.validarNombreApellido() && this.validarDni() && this.validarCorreo() &&  this.validarClave() && this.validarCuil() )
    {
      this.servicio.registerEmail(this.correo, this.clave).then((a) => {

        if(this.file != null){
          // this.servicio.uploadPhoto(this.file, `${this.perfilSeleccionado.toLowerCase()}/${this.correo}`).then((datos) => {
          //   this.url = <string>datos;
          //   this.servicio.createDocInDB(`${this.perfilSeleccionado.toLowerCase()}`, this.correo, this.toJSON());
          //   this.servicio.sendNotification(this.correo, 'dueño')
          // });
        }
        else{
          this.url = 'default';
          this.servicio.createDocInDB(`${this.perfilSeleccionado.toLowerCase()}`, this.correo, this.toJSON());
          this.servicio.sendNotification(this.correo, 'dueño')
        }

        $("#form-button-register").addClass("animation");
        setTimeout(()=> {
          this.spinner.activateAndRedirect("backdrop",3000,"login");
        },1000)

      }).catch((error)=>{
        this.s_utilidad.textoMostrar("#modal-error-text-p","Usuario ya existente", "#modal-error", ".container-registro")
        this.vibrationService.error()
      })
    }
    else{
      this.vibrationService.error()
    }
  }

  validarCorreo() : boolean
  {
    let retorno = false;
    let regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    if(!regex.test(this.correo))
    {
      this.s_utilidad.textoMostrar("#modal-error-text-p","El campo debe ser de tipo correo", "#modal-error", ".container-registro");
      this.vibrationService.error()
    }
    else if(this.correo == "")
    {
      this.s_utilidad.textoMostrar("#modal-error-text-p","Correo requerido", "#modal-error", ".container-registro");
      this.vibrationService.error()
    }
    else
    {
      retorno = true;
    }

    return retorno;
  }

  validarClave() : boolean
  {
    let retorno = false

    if(this.clave == "")
    {
      this.s_utilidad.textoMostrar("#modal-error-text-p","Contraseña requerida", "#modal-error", ".container-registro");
      this.vibrationService.error()
    }
    else if(this.clave.length < 6)
    {
      this.s_utilidad.textoMostrar("#modal-error-text-p","La clave debe ser mayor a 6 digitos", "#modal-error", ".container-registro");
      this.vibrationService.error()
    }
    else
    {
      retorno = true;
    }

    return retorno;
  }

  validarNombreApellido() : boolean
  {
    let retorno = false;
    let regexLetras = /[a-zA-Z]/;

    if(this.nombre == "")
    {
      this.s_utilidad.textoMostrar("#modal-error-text-p","Nombre requerido", "#modal-error", ".container-registro");
      this.vibrationService.error()
    }
    else if(this.apellido == "")
    {
      this.s_utilidad.textoMostrar("#modal-error-text-p","Contraseña requerida", "#modal-error", ".container-registro");
      this.vibrationService.error()
    }
    else if(!regexLetras.test(this.nombre) || !regexLetras.test(this.apellido))
    {
      this.s_utilidad.textoMostrar("#modal-error-text-p","El campo debe incluir solo letras", "#modal-error", ".container-registro");
      this.vibrationService.error()
    }
    else
    {
      retorno = true;
    }

    return retorno;
  }

  validarDni() : boolean
  {
    let retorno = false;
    let regexNumero = /[0-9]/;

    if(this.dni == undefined)
    {
      this.s_utilidad.textoMostrar("#modal-error-text-p","Dni requerido", "#modal-error", ".container-registro");
      this.vibrationService.error()
    }
    else if(!regexNumero.test(this.dni.toString()))
    {
      this.s_utilidad.textoMostrar("#modal-error-text-p","El campo dni debe ser de tipo numerico", "#modal-error", ".container-registro");
      this.vibrationService.error()
    }
    else if(this.dni.toString().length != 8)
    {
      this.s_utilidad.textoMostrar("#modal-error-text-p","El campo dni debe poseer 8 numeros", "#modal-error", ".container-registro");
      this.vibrationService.error()
    }
    else
    {
      retorno = true;
    }

    return retorno;
  }

  validarCuil() : boolean
  {
    let retorno = false;

    if(this.perfil != 'cliente'){
      let regexNumero = /[0-9-]/;

      if(this.cuil == undefined)
      {
        this.s_utilidad.textoMostrar("#modal-error-text-p","Cuil requerido", "#modal-error", ".container-registro");
        this.vibrationService.error()
      }
      else if(!regexNumero.test(this.cuil.toString()))
      {
        this.s_utilidad.textoMostrar("#modal-error-text-p","El campo cuil tiene formato incorrecto", "#modal-error", ".container-registro");
        this.vibrationService.error()
      }
      else if(this.cuil.toString().length != 13)
      {
        this.s_utilidad.textoMostrar("#modal-error-text-p","El campo cuil debe poseer 13 caracteres", "#modal-error", ".container-registro");
        this.vibrationService.error()
      }
      else{
        retorno = true
      }
    }
    else{
      retorno = true
    }

    return retorno;
  }

  validarTipoEmpleado(){
    let flag = false
    if(this.perfil != 'cliente'){
      if(this.perfilSeleccionado == 'cliente' || this.perfilSeleccionado == 'Seleccione tipo usuario'){
        this.s_utilidad.textoMostrar("#modal-error-text-p", ' Seleccione un perfil de empleado', "#modal-error", ".container-registro")
        this.vibrationService.error()
        flag = true
      }
    }

    return !flag
  }

  toJSON()
  {
    let data:any; 
    if(this.perfil.toLowerCase() == 'cliente')
      data = {correo : this.correo, clave : this.clave, nombre : this.nombre, apellido : this.apellido, dni : this.dni, foto : this.url, habilitado: 'pendiente', perfil : "cliente"};
    else
      data = {correo : this.correo, clave : this.clave, nombre : this.nombre, apellido : this.apellido, dni : this.dni, foto : this.url, perfil : this.perfilSeleccionado.toLowerCase(), cuil : this.cuil};

    return data;
  }

  selectPhotoInPhotolibrary(){
    this.servicio.choosePhotoLibrary().then(foto => this.file = <string>foto);
  }

  scanDNI(){
    this.QRService.scan('PDF_417').then((data:any)=>{
      let datosUsuario = this.QRService.decodeDNI(data.text)
      console.log(datosUsuario)
      this.nombre = this.upperCaseToFirstUpperCase(datosUsuario.nombre)
      this.apellido = this.upperCaseToFirstUpperCase(datosUsuario.apellido)
      this.dni = datosUsuario.dni
      this.registro = true
    })
  }

  upperCaseToFirstUpperCase(string:string){
    let notFirstChar = string.substring(1, string.length).toLowerCase()
    string = string.substring(0,1) + notFirstChar
    console.log(string)
    return string
  }

  setSelectedProfile()
  {
    var select: any = document.getElementById("form-input-select");
    this.perfilSeleccionado = select.options[select.selectedIndex].text;
  }

  redirectBack()
  {
    this.location.back();
  }
}

