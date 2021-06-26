import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy, RouterModule } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule } from "angularfire2/auth";
import { environment } from "../environments/environment";
import { AngularFirestoreModule } from "angularfire2/firestore";

import { Vibration } from "@ionic-native/vibration/ngx";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import * as $ from "jquery";

import { RegistroPage } from './pages/registro/registro.page';
import { FormsModule } from '@angular/forms';
import { BebidasPipe } from './pipes/bebidas.pipe';
import { BebidaNuevoPipe } from './pipes/bebida-nuevo.pipe';
import { ComidasPipe } from './pipes/comidas.pipe';
import { ComidaNuevoPipe } from './pipes/comida-nuevo.pipe';


@NgModule({
  declarations: [
    AppComponent, 
    RegistroPage, BebidasPipe, BebidaNuevoPipe, ComidasPipe, ComidaNuevoPipe, 
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    CommonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Vibration,
    Camera,
    BarcodeScanner,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
