import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { HomePage } from './home.page';
import { DuenioComponent } from '../components/duenio/duenio.component';
import { HomeMozoComponent } from '../components/mozo/home-mozo/home-mozo.component';
import { HomePageRoutingModule } from './home-routing.module';
import { HomeMetreComponent } from '../components/metre/metre.component';
import { BartenderComponent } from '../components/bartender/bartender.component';
import { CocineroComponent } from '../components/cocinero/cocinero.component';
import { ConsultasComponent } from '../components/mozo/consultas/consultas.component';
import { PagosComponent } from '../components/mozo/pagos/pagos.component';
import { PedidosComponent } from '../components/mozo/pedidos/pedidos.component';
import { PedidosPendientesComponent } from '../components/mozo/pedidos-pendientes/pedidos-pendientes.component';
import { ChangeStatusColorDirective } from '../directives/change-status-color.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
  ],
  declarations: [
    HomePage,
    DuenioComponent,
    HomeMozoComponent,
    HomeMetreComponent,
    BartenderComponent,
    CocineroComponent,
    ConsultasComponent,
    PagosComponent,
    PedidosComponent,
    PedidosPendientesComponent,
    ChangeStatusColorDirective,
  ]
})
export class HomePageModule {}