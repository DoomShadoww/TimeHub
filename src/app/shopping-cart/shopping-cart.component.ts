import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
  imports: [ CommonModule]
})
export class ShoppingCartComponent implements OnInit {
  carritoVisible = false;
  carritoItems: any[] = [];
  total = 0;
  productoSeleccionado: any = null;

  productos = [
    { titulo: 'Box Engasse', precio: 15000, imagenSrc: 'assets/boxengasse.png' },
    { titulo: 'English Horse', precio: 25000, imagenSrc: 'assets/englishrose.png' },
    { titulo: 'Knock Nap', precio: 35000, imagenSrc: 'assets/knocknap.png' },
    { titulo: 'La Night', precio: 18000, imagenSrc: 'assets/lanight.png' },
    { titulo: 'Silver All', precio: 32000, imagenSrc: 'assets/silverall.png' },
    { titulo: 'Skin Glam', precio: 18000, imagenSrc: 'assets/skinglam.png' },
    { titulo: 'Midimix', precio: 54000, imagenSrc: 'assets/midimix.png' },
    { titulo: 'Sir Blue', precio: 32000, imagenSrc: 'assets/sirblue.png' },
    { titulo: 'Middlesteel', precio: 42800, imagenSrc: 'assets/middlesteel.png' },
  ];

  ngOnInit(): void {}

  agregarItemAlCarrito(producto: any) {
    const itemExistente = this.carritoItems.find(item => item.titulo === producto.titulo);
    if (itemExistente) {
      alert("El item ya se encuentra en el carrito");
      return;
    }

    this.carritoItems.push({ ...producto, cantidad: 1 });
    this.actualizarTotalCarrito();
    this.hacerVisibleCarrito();
  }

  eliminarItemCarrito(index: number) {
    this.carritoItems.splice(index, 1);
    this.actualizarTotalCarrito();
    if (this.carritoItems.length === 0) {
      this.ocultarCarrito();
    }
  }

  sumarCantidad(index: number) {
    this.carritoItems[index].cantidad++;
    this.actualizarTotalCarrito();
  }

  restarCantidad(index: number) {
    if (this.carritoItems[index].cantidad > 1) {
      this.carritoItems[index].cantidad--;
      this.actualizarTotalCarrito();
    }
  }

  hacerVisibleCarrito() {
    this.carritoVisible = true;
  }

  ocultarCarrito() {
    this.carritoVisible = false;
  }

  pagarClicked() {
    alert("Gracias por la compra");
    this.carritoItems = [];
    this.actualizarTotalCarrito();
    this.ocultarCarrito();
  }

  actualizarTotalCarrito() {
    this.total = this.carritoItems.reduce((sum, item) => {
      return sum + item.precio * item.cantidad;
    }, 0);
  }

    // Nuevo método para seleccionar un producto y mostrar detalles
    mostrarDetallesProducto(producto: any) {
      this.productoSeleccionado = producto;
    }

    // Nuevo método para cerrar los detalles del producto
    cerrarDetalle() {
      this.productoSeleccionado = null;
    }
}
