import { Component, inject } from '@angular/core';
import { Categoria } from './categoria.model';
import { CategoriasService } from './categorias.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-categorias',
  imports: [CommonModule],
  templateUrl: './lista-categorias.component.html',
})
export class ListaCategoriasComponent {

  categorias !: Categoria[];
  private enrutador = inject(Router);
  constructor( private categoriaService: CategoriasService){}

  ngOnInit(){
    //cargamos las categorias
    this.obtenerCategorias();
  }

  obtenerCategorias(){
    // Lógica para obtener la lista de categorías
    this.categoriaService.obtenerCategoriasLista().subscribe(
      {
        next: (datos) => {
          console.log("datos recibidos:", datos);
          this.categorias = datos;
        },
        error: (error) =>{
          console.error("Error al obtener categorias", error)
        }
      }
    );
  }


  editarCategoria(id: number) {
        this.enrutador.navigate(['/form-categorias', id])

  }
  
  eliminarCategoria(id:number){
    this.categoriaService.eliminarCategoria(id).subscribe({
      next: (datos)=> this.obtenerCategorias(),// asi vuelve a cargarlos sin este producto
      error: (errores) =>{ console.log(errores);
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
