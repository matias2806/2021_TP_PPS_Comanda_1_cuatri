import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
/*import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire";
import { storage, functions } from "firebase";*/
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { Router } from "@angular/router";
import { map } from "rxjs/internal/operators/map";
import { FunctionCall } from "@angular/compiler";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private afAuth: AngularFireAuth,
    private camera: Camera,
    private http: HttpClient
  ) { }

  logout() {
    return this.afAuth.signOut();
  }

  loginEmail(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afAuth
        .signInWithEmailAndPassword(email, pass)
        .then(
          (userData) => {
            console.log(userData);
            resolve(userData);
          },
          (err) => reject(err)
        )
        .catch((e) => reject(e));
    });
  }

  getCurrentUser(): any {
    return this.afAuth.currentUser;
  }
}
