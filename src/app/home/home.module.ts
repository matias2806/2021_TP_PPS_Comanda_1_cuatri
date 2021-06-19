import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { HomeMozoComponent } from '../components/mozo/home-mozo/home-mozo.component';
import { MetreComponent } from '../components/metre/metre.component';
import { DuenioComponent } from '../components/duenio/duenio.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [
    HomePage,
    HomeMozoComponent,
    MetreComponent,
    DuenioComponent
  ]
})
export class HomePageModule {}
