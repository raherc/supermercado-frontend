import { Component, inject } from '@angular/core';
import { Categoria } from './categoria.model';
import { CategoriasService } from './categorias.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-categorias',
  imports: [FormsModule,CommonModule, RouterModule],
  templateUrl: './form-categorias.component.html',
})
export class FormCategoriasComponent {

  categoria: Categoria = new Categoria();
  idCategoria!: number;

  private categoriaServicio = inject(CategoriasService);
  private enrutador = inject(Router);
  private ruta = inject(ActivatedRoute);

  ngOnInit() {
    this.idCategoria = this.ruta.snapshot.params['id'];
    //ahora vamos al back con este id y recuperamos datos de categoria si esta informada
    if(this.idCategoria){
      this.recuperarDatosCategoria();
    }
  }
  
  onSubmit() {
    if (this.idCategoria) {
      this.editarCategoria();

    } else {
      this.altaCategoria();
    }
  }

  recuperarDatosCategoria(){
    this.categoriaServicio.obtenerCategoriaPorId(this.idCategoria).subscribe({
      next: (datos) => this.categoria = datos,
      error:(error: any) => console.log(error)
    })
  }

  editarCategoria() {
    this.categoriaServicio.editarCategoria(this.idCategoria, this.categoria).subscribe({
      next: (datos) => this.irListaCategorias(),
      error: (error: any) => console.log(error)
    })
  }

  altaCategoria() {
    this.categoriaServicio.agregarCategoria(this.categoria).subscribe({
      next: (datos) => this.irListaCategorias(),
      error: (error: any) => console.log(error)
    })
  }

  irListaCategorias() {
    this.enrutador.navigate(['categorias'])
  } 
}
