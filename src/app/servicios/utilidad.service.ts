import { Injectable } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilidadService {

  constructor() { }

  getDateTime() : string{
    var fecha = new Date();
    let d,m,y,h,min,s;
    d = fecha.getDate();
    m = fecha.getUTCMonth();
    y = fecha.getFullYear();
    h = fecha.getHours().toString();
    min = fecha.getMinutes().toString();
    s = fecha.getSeconds().toString();

    return y + "-" + m + "-" + d + "_" + h + "-" + min + "-" + s;
  }

  textoMostrar(tag:string, msj:string, container:string, containerBlur:string){
    switch(msj){
      case "auth/user-not-found":
        $(`${tag}`).text('El E-Mail no fue encontrado');
        break;
      case "auth/argument-error":
        $(`${tag}`).text('E-Mail o contraseña incorrectos');
        break;
      case "auth/wrong-password":
        $(`${tag}`).text('La contraseña es incorrecta');
        break;
      case "auth/invalid-email":
        $(`${tag}`).text('El Email tiene un formato incorrecto');
        break;
      default:
        $(`${tag}`).text(msj);
        break;
    }

    this.blur(`${containerBlur}`, 2000);
    this.fadeInAndOut(`${container}`);

  }

  fadeInAndOut(tag:string)
  {
    $(`${tag}`).fadeIn();
    setTimeout( () => {
      $(`${tag}`).fadeOut();
    },2000);
  }

  blur(tag:string, time: number)
  {
    $(`${tag}`).css("filter", "blur(5px)");
    setTimeout( () => {
      $(`${tag}`).css("filter", "blur(0px)");
    },time);
  }
}
