import { Component } from '@angular/core';
// import { FirebaseService } from '../services/firebase.service';
import { SpinnerService } from '../servicios/spinner.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  currentUser
  tipoUser
  dataUser
  fotis = '../../assets/img/noPhoto.png';

  constructor(/*private fireService:FirebaseService,*/ private spinnerService:SpinnerService, private location : Location) {
    spinnerService.activateFor('backdrop', 2000);
    // this.currentUser = fireService.getCurrentUser()
  
    // if(!this.currentUser.isAnonymous){
    //   fireService.getUserProfile(this.currentUser.email).then((data:any)=>{
    //     this.tipoUser=data
    //     this.fireService.getDBByDoc(this.tipoUser, this.currentUser.email).then(a=>{
    //       this.dataUser=a
    //       this.fotis = this.dataUser.foto == 'default' ? '../../assets/img/noPhoto.png' : this.dataUser.foto; 
    //     })
    //   });
      
    // }
    // else{
    //   this.tipoUser = 'cliente';
    //   this.fireService.getDBByDoc(this.tipoUser, this.currentUser.email).then(a=>{
    //     this.dataUser=a
    //     this.fotis = this.dataUser.foto == 'default' ? '../../assets/img/noPhoto.png' : this.dataUser.foto; 
    //   })
    // }

  }


  back() {
    // this.location.back();
  }

}
