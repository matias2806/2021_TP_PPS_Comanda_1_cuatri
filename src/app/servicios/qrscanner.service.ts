import { Injectable } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Injectable({
  providedIn: 'root'
})
export class QRScannerService {

  constructor(private scanner: BarcodeScanner) { }

  scan(format: string = "") {
    return new Promise((resolve, reject) => {
      this.scanner.scan({ "formats": `${format}` }).then(data => {
        resolve(data)
      }).catch(e => reject(e))
    })
  }

  decodeDNI(code: string) {
    let parsedData = code.split('@');
    let nombre = parsedData[2].toString();
    let apellido = parsedData[1].toString();
    let dni: number = +parsedData[4];

    return { nombre: nombre, apellido: apellido, dni: dni }
  }

  scanMesaGeneral(scanMesa: boolean) {
    this.scan().then((a: any) => {
      switch (a.text) {
        case 'Mesa 1 ReComiendo':
          scanMesa = true;
          break;
        case 'Mesa 2 ReComiendo':
          scanMesa = true;
          break;
        case 'Mesa 3 ReComiendo':
          scanMesa = true;
          break;
        case 'Mesa 4 ReComiendo':
          scanMesa = true;
          break;
      }
    });
  }

}

