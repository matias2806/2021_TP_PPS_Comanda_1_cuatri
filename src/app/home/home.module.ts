import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { HomePage } from './home.page';
import { DuenioComponent } from '../components/duenio/duenio.component';
import { HomeMozoComponent } from '../components/mozo/home-mozo/home-mozo.component';
import { PagosComponent } from '../components/mozo/pagos/pagos.component';
import { PedidosComponent } from '../components/mozo/pedidos/pedidos.component';
import { ConsultasComponent } from '../components/mozo/consultas/consultas.component';
import { ClienteComponent } from '../components/cliente/cliente.component';
import { SolicitudesComponent } from '../components/solicitudes/solicitudes.component';
import { ListadoMesasComponent } from '../components/metre/listado-mesas/listado-mesas.component';
import { MenuComponent } from '../components/menu/menu.component';
import { HomeMetreComponent } from '../components/metre/home-metre/home-metre.component'
import { HomePageRoutingModule } from './home-routing.module';
import { ListaEsperaComponent } from '../components/metre/lista-espera/lista-espera.component'
import { BartenderComponent } from '../components/bartender/bartender.component';
import { CocineroComponent } from '../components/cocinero/cocinero.component';
import { EncuestaComponent } from '../components/encuesta/encuesta.component';
import { EstadisticasComponent } from '../components/estadisticas/estadisticas.component';
import { PedidosPendientesComponent } from '../components/mozo/pedidos-pendientes/pedidos-pendientes.component';
import { EstadoPedidoComponent } from '../components/estado-pedido/estado-pedido.component';
import { ClienteDespedidaComponent } from '../components/cliente/cliente-despedida/cliente-despedida.component';
import { ChangeStatusColorDirective } from '../directives/change-status-color.directive'
import { ComidaNuevoPipe } from '../pipes/comida-nuevo.pipe';
import { BebidaNuevoPipe } from '../pipes/bebida-nuevo.pipe';

import { ChartModule } from 'angular-highcharts';
import { HIGHCHARTS_MODULES } from 'angular-highcharts';
import exporting from 'highcharts/modules/exporting.src.js';
export function highchartModules() {
  return [exporting]
}
import * as Highcharts from 'highcharts';
import more from 'highcharts/highcharts-more';
more(Highcharts);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ChartModule,
  ],
  declarations: [
    HomePage,
    DuenioComponent,
    HomeMozoComponent,
    ClienteComponent,
    SolicitudesComponent,
    ListadoMesasComponent,
    MenuComponent,
    HomeMetreComponent,
    PagosComponent,
    PedidosComponent,
    ConsultasComponent,
    ListaEsperaComponent,
    ListadoMesasComponent,
    BartenderComponent,
    CocineroComponent,
    EncuestaComponent,
    EstadisticasComponent,
    PedidosPendientesComponent,
    EstadoPedidoComponent,
    ClienteDespedidaComponent,
    ComidaNuevoPipe,
    BebidaNuevoPipe,
    ChangeStatusColorDirective
  ],
  providers: [
    { provide: HIGHCHARTS_MODULES, useFactory: highchartModules }
  ],
})
export class HomePageModule { }
