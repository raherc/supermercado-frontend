import { Component, inject } from '@angular/core';
import { Venta } from './venta.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Sucursal } from '../sucursales/sucursal.model';
import { SucursalesService } from '../sucursales/sucursales.service';
import { ProductosService } from '../productos/productos.service';
import { Producto } from '../productos/producto.model';
import { DetalleVenta } from './detalle-venta.model';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { VentasService } from './ventas.service';

@Component({
  selector: 'app-form-ventas',
  imports: [FormsModule,CommonModule, RouterModule],
  templateUrl: './form-ventas.component.html',
})
export class FormVentasComponent {



  venta: Venta = {
  id: 0,
  fecha: new Date(),
  estado: 'CONFIRMADA',
  idSucursal: null,
  detalle: [],
  total: 0
};

// detalle: DetalleVenta = {
//   id: 0,
//   nombreProd: '',
//   idProducto: 0,
//   cantProd: 0,
//   precio: 0,
//   subtotal: 0
// };  

private sucursalSercicio = inject(SucursalesService);
private productoServicio = inject(ProductosService);
private ventaServicio = inject(VentasService);
private enrutador = inject(Router); 

sucursales !: Sucursal[];
productos !: Producto[];

productoSeleccionado: any = null;
cantidad: number | null = null;


ngOnInit() {
  this.cargarSucursales();
  this.cargarProductos();

}

cargarProductos() {
  this.productoServicio.obtenerProductosLista().subscribe({
    next: (productos) => {
      this.productos = productos;
    },
    error: (error) => {
      console.error('Error al cargar productos:', error);
    }
  });
} 

cargarSucursales() {
  this.sucursalSercicio.obtenerSucursalesLista().subscribe({
    next: (sucursales) => {
      this.sucursales = sucursales;
    },
    error: (error) => {
      console.error('Error al cargar sucursales:', error);
    }
  });
}

agregarDetalle() {

  if (!this.productoSeleccionado || !this.cantidad) {
    return;
  }

  //buscamo si producto ya esta en el detalle
  const detalleExistente = this.venta.detalle.find(d => d.idProducto === this.productoSeleccionado.id);
  if (detalleExistente) {
    console.log("dentrooooo Producto ya existe en el detalle");
    // Si ya existe, actualizamos la cantidad y el subtotal
    detalleExistente.cantProd += this.cantidad;
    detalleExistente.subtotal = detalleExistente.cantProd * detalleExistente.precio;
    this.calcularTotal();

    // Resetear inputs
    this.productoSeleccionado = null;
    this.cantidad = null;
    Swal.fire({
      icon: 'info',
      title: 'Producto actualizado',
      text: 'Unidades añadidas al detalle de la venta.',
      timer: 1500,
      showConfirmButton: false
    });
    return;
  }else {

    console.log("elseeeeeeeProducto no existe en el detalle, lo agregamos");  
 const detalle: DetalleVenta = {
    id: 0, // se ignora al crear, el backend lo asignará
    idProducto: this.productoSeleccionado.id,
    nombreProd: this.productoSeleccionado.nombre,
    cantProd: this.cantidad,
    precio: this.productoSeleccionado.precio,
    subtotal: this.cantidad * this.productoSeleccionado.precio
  };
  console.log("detalle a agregar:", detalle);
  this.venta.detalle.push(detalle);
}
 
 

  // Resetear inputs
  this.productoSeleccionado = null;
  this.cantidad = null;
}

guardarVenta() {
  console.log(this.venta.detalle)
 if (this.venta.detalle.length === 0) {
    //alert('Debes añadir al menos un detalle de pedido');
     Swal.fire({
            icon: 'warning',
            title: 'Warning',
            text: "Debes añadir mínimo un producto a la venta", 
            confirmButtonText: 'Cerrar'
          })
    return;
  }

  this.ventaServicio.agregarVenta(this.venta).subscribe({
    next: (datos: any) => {
      console.log('Venta guardada con éxito:', datos);
      Swal.fire({
      icon: 'info',
      title: 'Venta completada',
      text: `Identificador de la venta: ${datos.id}`,
      timer: 1500,
      showConfirmButton: false
    });
      this.irListaVentas();
    },
    error: (error) => {
      console.error('Error al guardar la venta:', error);
    }
  });   
}

eliminarDetalle(index: number) {
  this.venta.detalle.splice(index, 1);
  this.calcularTotal();  // recalcular el total después de eliminar
}

calcularTotal() {
  this.venta.total = this.venta.detalle
    .reduce((sum, d) => sum + d.subtotal, 0);
}

irListaVentas() {
  this.enrutador.navigate(['ventas'])

}



}