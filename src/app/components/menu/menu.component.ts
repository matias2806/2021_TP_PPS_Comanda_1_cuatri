import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { PedidosService } from "src/app/servicios/pedidos.service";
import { send } from "process";
import { FirebaseService } from "src/app/servicios/firebase.service";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"],
})
export class MenuComponent implements OnInit {
  @Output() terminoPedido: EventEmitter<any> = new EventEmitter<any>();
  @Input() mesaOcupada: string;
  @Input() recibirMesa: string;

  listadoPedido = {
    platos: {
      milanesa: { cantidad: 0, precio: 330 },
      fideos: { cantidad: 0, precio: 230 },
      muzzarelitas: { cantidad: 0, precio: 190 },
      hamburguesa: { cantidad: 0, precio: 280 },
    },
    bebidas: {
      gaseosa: { cantidad: 0, precio: 100 },
      agua: { cantidad: 0, precio: 80 },
      cerveza: { cantidad: 0, precio: 60 },
    },
    postres: {
      chocotorta: { cantidad: 0, precio: 70 },
      helado: { cantidad: 0, precio: 80 },
      flan: { cantidad: 0, precio: 50 },
    },
  };
  totalAmount: number = 0;
  orderConfirmation: boolean = false;
  menu: string = "platos";
  abrirConsulta: boolean = false;
  consulta: any;

  constructor(
    private pedidosService: PedidosService,
    private fireService: FirebaseService
  ) {}

  ngOnInit() {}

  desplegarMenu(id) {
    document.getElementById(id).style.transform = "scaleY(1)";
    document.querySelectorAll(".open-icon").forEach((element) => {
      element.setAttribute("hidden", "true");
    });
  }

  quitarMenu(id) {
    document.getElementById(id).style.transform = "scaleY(0)";
    document.querySelectorAll(".open-icon").forEach((element) => {
      element.removeAttribute("hidden");
    });
  }

  agregarProducto(descripcion: string, precio: number, tipo: string) {
    if (
      this.listadoPedido[tipo.toLocaleLowerCase()][
        descripcion.toLocaleLowerCase()
      ]
    ) {
      this.listadoPedido[tipo.toLocaleLowerCase()][
        descripcion.toLocaleLowerCase()
      ].cantidad++;
      this.totalAmount += this.listadoPedido[tipo.toLocaleLowerCase()][
        descripcion.toLocaleLowerCase()
      ].precio;
    } else {
      this.listadoPedido[tipo.toLocaleLowerCase()][
        descripcion.toLocaleLowerCase()
      ] = { precio: precio, cantidad: 1 };
      this.totalAmount += this.listadoPedido[tipo.toLocaleLowerCase()][
        descripcion.toLocaleLowerCase()
      ].precio;
    }
  }

  removerProducto(descripcion: string, tipo: string) {
    if (
      this.listadoPedido[tipo.toLocaleLowerCase()][
        descripcion.toLocaleLowerCase()
      ] &&
      this.listadoPedido[tipo.toLocaleLowerCase()][
        descripcion.toLocaleLowerCase()
      ].cantidad > 0
    ) {
      this.listadoPedido[tipo.toLocaleLowerCase()][
        descripcion.toLocaleLowerCase()
      ].cantidad--;
      this.totalAmount -= this.listadoPedido[tipo.toLocaleLowerCase()][
        descripcion.toLocaleLowerCase()
      ].precio;
    }
  }

  agregarPedido() {
    let pendienteBebida: boolean = false;
    let pendienteComida: boolean = false;

    if (
      this.listadoPedido.bebidas.agua.cantidad > 0 ||
      this.listadoPedido.bebidas.gaseosa.cantidad > 0 ||
      this.listadoPedido.bebidas.cerveza.cantidad > 0
    ) {
      pendienteBebida = true;
    }
    if (
      this.listadoPedido.platos.fideos.cantidad > 0 ||
      this.listadoPedido.platos.hamburguesa.cantidad > 0 ||
      this.listadoPedido.platos.milanesa.cantidad > 0 ||
      this.listadoPedido.platos.muzzarelitas.cantidad > 0 ||
      this.listadoPedido.postres.chocotorta.cantidad > 0 ||
      this.listadoPedido.postres.flan.cantidad > 0 ||
      this.listadoPedido.postres.helado.cantidad > 0
    ) {
      pendienteComida = true;
    }
    this.pedidosService.addOrderToOrders(
      this.listadoPedido,
      this.mesaOcupada ?? this.recibirMesa,
      this.totalAmount
    );
    this.pedidosService.addOrderToTable(
      this.listadoPedido,
      this.mesaOcupada ?? this.recibirMesa,
      this.totalAmount,
      pendienteComida,
      pendienteBebida
    );

    this.fireService.sendNotification("", "mozoComidaNueva");
    this.terminoPedido.emit("encuesta");
  }

  enviarConsulta() {
    this.pedidosService.sendQuery(
      this.consulta,
      this.mesaOcupada ?? this.recibirMesa
    );
    this.abrirConsulta = false;
    this.fireService.sendNotification(
      Math.floor(Math.random() * (10000 - 1) + 1),
      "mozoConsulta"
    );
  }
}
