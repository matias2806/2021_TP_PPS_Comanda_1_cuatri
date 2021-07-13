import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FirebaseService } from 'src/app/servicios/firebase.service';
import { Chart } from 'angular-highcharts';
import more from 'highcharts/highcharts-more';
more(Highcharts);
import * as Highcharts from 'highcharts';
import { SpinnerService } from 'src/app/servicios/spinner.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss'],
})


export class EstadisticasComponent implements OnInit {

  @Output() volver: EventEmitter<any> = new EventEmitter<any>();

  chart: Chart = new Chart;
  chart2: Chart = new Chart;
  public listadoEncuestas;
  public estadisticas: boolean = true;

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

  constructor(private fireService: FirebaseService, private spinnerService: SpinnerService) {
    spinnerService.activateFor('backdrop', 2000);
  }

  ngOnInit() {
    this.fireService.getDB("encuestas").then((datos) => {
      this.listadoEncuestas = datos;
      this.armarchart3();
    });

    this.armarchart2();
  }

  armarchart2() {
    var info = this.armaData2();
    // console.log(info);

    this.chart2 = new Chart({
      chart: {
        renderTo: 'container',
        type: 'pie'
      },
      title: {
        text: 'Experiencias. '
      },
      series: [{
        type: 'pie',
        name: 'graf',
        data: info
      }]
    });
  }

  armaData2() {
    var b: any[] = [];


    b.push({ name: "Los recomiendo", y: 12 })
    b.push({ name: "Espero que mejoren", y: 5 })
    b.push({ name: "Mala experiencia", y: 2 })

    // var arrayEspe: string[] = [];
    // this.listadoEspecialidad.forEach(esp => {
    //   arrayEspe.push(esp.nombre);
    // });

    // arrayEspe.forEach(nombreEsp => {
    //   var info: any;
    //   info = {
    //     name: nombreEsp,
    //     y: 0,
    //   }
    //   this.listadoTurnos.forEach(turno => {
    //     if (turno.especialidad!.nombre == nombreEsp) {
    //       info.y++;
    //     }
    //   });
    //   b.push(info);

    // });
    return b;
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
    var contador = 0;
    this.satisfaccion.forEach(e => {
      this.listadoEncuestas.forEach(encuesta => {
        if (encuesta.encuesta.satisfecho == e.name) {
          contador++;
        }
      });
      e.data.push(contador);
      contador = 0;
    });
  }



  salir() {
    this.volver.emit(undefined);
  }

  siguiente() {
    this.spinnerService.activateFor('backdrop', 2000);
    this.estadisticas = !this.estadisticas;
  }
}
