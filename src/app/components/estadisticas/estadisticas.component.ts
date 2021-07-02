import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FirebaseService } from 'src/app/servicios/firebase.service';
import { Chart } from 'angular-highcharts';
import more from 'highcharts/highcharts-more';
more(Highcharts);
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss'],
})


export class EstadisticasComponent implements OnInit {

  @Output() volver: EventEmitter<any> = new EventEmitter<any>();

  chart: Chart = new Chart;
  public listadoEncuestas;

  public satisfaccion: any[] = [{
    name: 'Excelente',
    type: undefined,
    data: []
  },
  {
    name: 'Muy Bien',
    type: undefined,
    data: []
  },
  {
    name: 'Bien',
    type: undefined,
    data: []
  },
  {
    name: 'Regular',
    type: undefined,
    data: []
  },
  {
    name: 'Malo',
    type: undefined,
    data: []
  },
];

  constructor(private fireService: FirebaseService,) { }

  ngOnInit() {
    this.fireService.getDB("encuestas").then((datos) => {
      this.listadoEncuestas = datos;
      this.armarchart3();
    });
  }

  armarchart3() {
    this.preparaSerie();
    this.chart = new Chart({
      chart: {
        renderTo: 'container',
        type: 'column'
      },
      title: {
        text: 'Nivel de satisfacción'
      },
      xAxis: {
        categories: ['Nivel']

      },
      yAxis: {
        title: {
          text: 'Indice de satisfacción'
        },
        tickInterval: 1
      },
      series: this.satisfaccion
    });
  }

  preparaSerie() {
    var contador=0;
    this.satisfaccion.forEach(e => {      
      this.listadoEncuestas.forEach(encuesta => {
        if(encuesta.encuesta.satisfecho == e.name){
          contador++;
        }
      });
      e.data.push(contador);
      contador=0;
    });
  }



  salir() {
    this.volver.emit(undefined);
  }
}
