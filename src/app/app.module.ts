import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire//auth";
import { environment } from "../environments/environment";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClientModule } from "@angular/common/http";

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { RegistroPage } from './pages/registro/registro.page';
import { FormsModule } from '@angular/forms';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@NgModule({
  declarations: [AppComponent, RegistroPage],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, 
    SplashScreen,
    StatusBar, 
    Camera,
    Vibration,
    BarcodeScanner
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
