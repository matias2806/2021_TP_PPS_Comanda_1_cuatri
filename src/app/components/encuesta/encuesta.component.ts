import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FirebaseService } from 'src/app/servicios/firebase.service';
import { UtilidadService } from 'src/app/servicios/utilidad.service';
import { QRScannerService } from "src/app/servicios/qrscanner.service";

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss'],
})
export class EncuestaComponent implements OnInit {
  
  constructor(private fire : FirebaseService, private utilidad : UtilidadService, private QRService: QRScannerService,) { }

  cometario:string;
  @Input() mesa:string;
  @Input() mesaEncuesta:string;
  @Output() cancelar : EventEmitter<any> = new EventEmitter<any>();
  @Output() finalizar : EventEmitter<any> = new EventEmitter<any>();
  
  files = [];
  path = [];
  mesaData:any;
  propina:number;

  ngOnInit() 
  {
    this.fire.getTable(this.mesa??this.mesaEncuesta).then((data) =>
    {
      this.mesaData=data; 
    });
  }

  getRadio()
  {
    let aux_radio:any= document.querySelectorAll('input[type=radio]');

    for(let item of aux_radio)
    {
      if(item.checked)
      {
        return item.value;
      }
    }
  }

  getComentario()
  { 
    return (<HTMLInputElement>document.querySelector('#encuesta-textarea')).value;
  }

  finalizarEncuesta(){

    if(this.propina > 0)
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
    }
    
    this.subirEncuesta();
    this.fire.updateDoc("mesas", this.mesa ?? this.mesaEncuesta, this.mesaData);
    this.uploadAllPhotos();
    this.finalizar.emit("pagar");
  }

  subirEncuesta()
  {
    this.mesaData.encuesta = {comentario: this.getComentario(), satisfecho : this.getRadio()}
  }

  selectPhotoInPhotolibrary(){
    this.fire.choosePhotoLibrary().then((foto) =>
    {
      if(this.files.length < 3)
        this.files.push(<string>foto)
    });
  }

  uploadAllPhotos()
  {
    let contador = 0;

    for(let foto of this.files)
    {
      this.fire.uploadPhoto(foto, `encuesta/${this.utilidad.getDateTime()}_${contador}`).then((path)=>{

        this.path.push(path);

        if(this.path.length == this.files.length)
        {
          this.fire.createDocRandomInDB("encuestas", {fotos:this.path, encuesta: this.mesaData.encuesta});
        }
      });
    }
  }


}
