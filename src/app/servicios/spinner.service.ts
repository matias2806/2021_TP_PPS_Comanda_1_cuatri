import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery'

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor(private router : Router) { }

  activate(idBackdrop:string){
    $(`#${idBackdrop}`).removeAttr('hidden');
  }

  deactivate(idBackdrop:string){
    $(`#${idBackdrop}`).attr('hidden', "500");
  }

  async activateAndRedirect(idBackdrop:string, time:number,route:string){
    this.activateFor(idBackdrop,time);
    setTimeout(() => {
      this.router.navigate([route]);
    }, time);
    
  }

  activateFor(idBackdrop:string, time:number){
    this.activate(idBackdrop);
    setTimeout(() => {
      this.deactivate(idBackdrop);
    }, time);
  }
}
