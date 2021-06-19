import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from '../servicios/firebase.service';
import { UtilidadService } from '../servicios/utilidad.service';
import { VibrationService } from '../servicios/vibration.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteHabilitadoGuard implements CanActivate {

  constructor(private fire : FirebaseService, private vibrationService:VibrationService,private utilidad : UtilidadService){}
  current :any;
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.current = this.fire.getCurrentUser();

    if(!this.current.isAnonymous)
    {
        return this.fire.getDBByDoc("cliente",this.current.email).then((datos:any) => {

          if(datos != undefined){
            if(datos.habilitado == 'aceptado')
              return true;
            else{
              this.utilidad.textoMostrar("#mensajeTexto", "Usted no se encuentra autorizado, contactese con el mozo", "#mensajeLogin", "");
              this.vibrationService.error();
              return false;
            }
          }
          else{
            return true;
          }
          
        })
    }
    else{
      return true;
    }
      
  }
  
}