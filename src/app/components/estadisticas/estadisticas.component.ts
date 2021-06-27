import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FirebaseService } from 'src/app/servicios/firebase.service';
import { UtilidadService } from 'src/app/servicios/utilidad.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss'],
})
export class EstadisticasComponent implements OnInit {

  @Output() volver: EventEmitter<any> = new EventEmitter<any>();

  public listadoEncuestas;

  public excelente: any[]=[];
  public muyBien: any[]=[];
  public bien: any[]=[];
  public regular: any[]=[];
  public malo: any[]=[];

  constructor(private fireService: FirebaseService,) { }

  ngOnInit() {
    this.fireService.getDB("encuestas").then((datos) => {
      this.listadoEncuestas = datos;
      this.formatearEncuesta();
    });
  }

  formatearEncuesta(){
    console.log("Formateoooo...");
    console.log(this.listadoEncuestas);
  }

  
  salir() {
    this.volver.emit(undefined);
  }
}
