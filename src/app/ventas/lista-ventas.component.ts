import { Component, inject } from '@angular/core';
import { Venta } from './venta.model';
import { VentasService } from './ventas.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-ventas',
  imports: [CommonModule],
  templateUrl: './lista-ventas.component.html',
})
export class ListaVentasComponent {



  ventas: Venta[] = [];

  private ventasService = inject(VentasService);
  private route = inject(ActivatedRoute)

  ngOnInit(){
    this.obtenerVentas();
  }

  obtenerVentas(){
    this.ventasService.obtenerVentasLista().subscribe(
      {
        next: (datos) => {
          console.log("datos recibidos:", datos);
          this.ventas = datos;

        },
        error: (error) =>{
          console.error("Error al obtener ventas", error)
        }
      }
    );

  }

  eliminarProducto(id: number) {
    this.ventasService.eliminarVenta(id).subscribe({
      next: (datos) => this.obtenerVentas(),
      error: (errores) => {
        console.log(errores);
        Swal.fire({
          icon: 'error',
          title: 'Error al borrar venta',
          text: 'No se pudo eliminar la venta.',
          confirmButtonText: 'Cerrar'
        });
      }
    });
  }

}
