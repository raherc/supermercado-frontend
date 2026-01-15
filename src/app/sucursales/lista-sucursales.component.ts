import { Component, inject } from '@angular/core';
import { Sucursal } from './sucursal.model';
import { SucursalesService } from './sucursales.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-sucursales',
  imports: [CommonModule],
  templateUrl: './lista-sucursales.component.html',

})
export class ListaSucursalesComponent {


  sucursales !: Sucursal[];

  constructor( private sucursalService: SucursalesService){}

  private enrutador = inject(Router);

  ngOnInit(){
    //cargamos las sucursales
    this.obtenerSucursales();
    //console.log("sucursales a mostrar" + this.sucursales)
  }

  obtenerSucursales(){
    this.sucursalService.obtenerSucursalesLista().subscribe(
      {
        next: (datos) => {
          console.log("datos recibidos:", datos);
          this.sucursales = datos;

        },
        error: (error) =>{
          console.error("Error al obtener sucursales", error)
        }
      }
    );

  }
  editarSucursal(id: number) {
        this.enrutador.navigate(['/form-sucursales', id])

  }
  
  eliminarSucursal(id:number){
    this.sucursalService.eliminarSucursal(id).subscribe({
      next: (datos)=> this.obtenerSucursales(),// asi vuelve a cargarlos sin este producto
      error: (errores) => console.log(errores)
    })

  }

}
