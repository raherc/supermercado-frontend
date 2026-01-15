import { Component, inject } from '@angular/core';
import { Producto } from './producto.model';
import { Router } from '@angular/router';
import { ProductosService } from './productos.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-productos',
  imports: [CommonModule],
  templateUrl: './lista-productos.component.html',
})
export class ListaProductosComponent {


  productos!: Producto[];

  private enrutador = inject(Router);
  private productoService = inject(ProductosService);
  
   ngOnInit(){
    //cargamos los productos
    this.obtenerProductos();
    //console.log("sucursales a mostrar" + this.sucursales)
  }

  obtenerProductos(){
    this.productoService.obtenerProductosLista().subscribe(
      {
        next: (datos) => {
          console.log("datos recibidos:", datos);
          this.productos = datos;

        },
        error: (error) =>{
          console.error("Error al obtener productos", error)
        }
      }
    );
  }

  editarProducto(id: number) {
        this.enrutador.navigate(['/form-productos', id])

  }
  
  eliminarProducto(id:number){
    this.productoService.eliminarProducto(id).subscribe({
      next: (datos)=> this.obtenerProductos(),// asi vuelve a cargarlos sin este producto
      error: (errores) => {
        
        console.log(errores);
        // Si viene un objeto con validaciones, lo convertimos a texto
        let mensaje = '';

        // Caso 1: backend devuelve lista de errores de validación
        if (errores.error?.errors && Array.isArray(errores.error.errors)) {
          mensaje = errores.error.errors
            .map((e: any) => `${e.field}: ${e.message}`)
            .join('<br>');
        }
        // Caso 2: backend devuelve un objeto plano con campos -> mensajes
        else if (typeof errores.error === 'object') {
          mensaje = Object.values(errores.error).join('<br>');
        }
        // Caso 3: backend devuelve texto plano
        else if (typeof errores.error === 'string') {
          mensaje = errores.error;
        }
        Swal.fire({
          icon: 'error',
          title: 'Error al borrar producto',
          //text: mensaje,
          html: mensaje,
          confirmButtonText: 'Cerrar'
        })
      }
    })

  }


}
