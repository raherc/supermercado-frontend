import { Component, inject } from '@angular/core';
import { ProductosService } from '../../productos/productos.service';
import { Producto } from '../../productos/producto.model';
import { CommonModule } from '@angular/common';
import { Venta } from '../../ventas/venta.model';
import { VentasService } from '../../ventas/ventas.service';
import { SucursalesService } from '../../sucursales/sucursales.service';
import { Sucursal } from '../../sucursales/sucursal.model';

@Component({
  selector: 'app-inicio',
  imports: [CommonModule],
  templateUrl: './inicio.component.html',
})
export class InicioComponent {

  private servicioProductos = inject(ProductosService);
  private servicioVentas = inject(VentasService); 
  private servicioSucursales = inject(SucursalesService);

  productosBajoStock: Producto[] = [];
  ventasPendientes: Venta[] = []; 
  sucursales: Sucursal[] = [];
  topProductos : any[] = [];

  ngOnInit(){
    //productos bajos de stock
    this.servicioProductos.obtenerProductosLista().subscribe({
      next: (datos) => {
        console.log("Productos recibidos en inicio:", datos);
        this.productosBajoStock = datos.filter(producto => producto.cantidad < 5);
      },
      error: (error) => {
        console.error("Error al obtener productos bajos de stock:", error);
      }
    });

    //ventas pendientes
    this.servicioVentas.obtenerVentasLista().subscribe({
      next: (datos) => {
        console.log("Ventas recibidas en inicio:", datos);
        this.ventasPendientes = datos.filter(venta => venta.estado === 'PENDIENTE');
        this.topProductos = this.obtenerProductoMasVendido(datos);
      },
      error: (error) => {
        console.error("Error al obtener ventas Pendientes:", error);
      }
    });

    //sucursales para obtener el nombre
    this.servicioSucursales.obtenerSucursalesLista().subscribe({
      next: (datos) => {
        this.sucursales = datos;
        console.log("Sucursales recibidas en inicio:", datos);
        
      },
      error: (error) => {
        console.error("Error al obtener Sucursales :", error);
      }
    });

  }

  obtenerNombreSucursal(id: number): string {
    let sucursal = this.sucursales.find(s => s.id === id);
    return sucursal ? sucursal.nombre : 'Cargando...';
  }


  obtenerProductoMasVendido(ventas: Venta[]) {
  // 1. Creamos un "acumulador" donde la llave será el ID del producto y el valor la cantidad total
  const conteoProductos: { 
    [key: number]: { nombre: string, cantidad: number } } = {};

  // 2. Recorremos cada venta
  ventas.forEach(venta => {
    // 3. Recorremos el detalle de esa venta
    venta.detalle.forEach(det => {
      if (conteoProductos[det.idProducto]) {
        // Si ya lo habíamos visto, sumamos la cantidad
        conteoProductos[det.idProducto].cantidad += det.cantProd;
      } else {
        // Si es la primera vez, creamos el registro
        conteoProductos[det.idProducto] = {
          nombre: det.nombreProd,
          cantidad: det.cantProd
        };
      }
    });
  });

  // 4. Convertimos el objeto en un array y lo ordenamos de mayor a menor
  const listaOrdenada = Object.values(conteoProductos)
    .sort((a, b) => b.cantidad - a.cantidad);

    console.log("Productos más vendidos ordenados:", listaOrdenada);

    return listaOrdenada;
  
}

}
