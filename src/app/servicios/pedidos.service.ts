import { Injectable } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
@Injectable({
  providedIn: "root",
})
export class PedidosService {
  constructor(private db: AngularFirestore) {}

  addOrderToTable(order, table, totalAmount, pendentFood, pendentDrink) {
    let obs = this.db
      .collection("mesas")
      .doc(table)
      .valueChanges()
      .subscribe((data: any) => {
        data.pendienteBebida = pendentDrink;
        data.pendienteComida = pendentFood;
        data.pedido.total = totalAmount;
        data.pedido.productos = order;
        data.pedido.totalConPropina = totalAmount;
        data.estado = "pendiente";
        this.db
          .collection("mesas")
          .doc(table)
          .update(data)
          .then((a) => obs.unsubscribe());
      });
  }

  addOrderToOrders(order, table, totalAmount) {
    // let obs = this.db.collection('pedidos').doc(table).valueChanges().subscribe((data:any)=>{
    //   console.log(data);
    //   console.log(table);
    //   data.total = totalAmount;
    //   data.productos = order;
    //   data.estado = 'pendiente';
    // })

    this.db
      .collection("pedidos")
      .doc(`${table}`)
      .update({ total: totalAmount, productos: order, estado: "pendiente" });
  }
  sendQuery(query: string, table) {
    this.db.collection("mesas").doc(table).update({ consulta: query });
  }
  sendQueryPayment(query: boolean, table) {
    this.db.collection("mesas").doc(table).update({ pagoPendiente: query });
  }
  isPaymentPending(table: string) {
    return new Promise((resolve, reject) => {
      this.db
        .collection("mesas")
        .doc(`${table}`)
        .valueChanges()
        .subscribe(
          (data) => resolve(data),
          (e) => reject(e)
        );
    });
  }

  changeOrderStatus(type:string, status:any, table:string){
    console.log(table)
    this.db.collection('mesas').doc(table).update({[type]: status}).then(a=>console.log(a),e=>console.log(e));
  }

}
