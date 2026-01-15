import { Component, inject } from '@angular/core';
import { Producto } from './producto.model';
import { ProductosService } from './productos.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Categoria } from '../categorias/categoria.model';
import { CategoriasService } from '../categorias/categorias.service';

@Component({
  selector: 'app-form-productos',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './form-productos.component.html',
})
export class FormProductosComponent {

  producto: Producto = new Producto;
  idProducto!:  number;
  //categorias para el desplegable
  categorias!: Categoria[]


  private productoServicio = inject(ProductosService);
  private categoriaServicio = inject(CategoriasService);
  private ruta = inject(ActivatedRoute)
  private enrutador = inject(Router);

   ngOnInit() {
    this.idProducto = this.ruta.snapshot.params['id'];
    //ahora vamos al back con este id y recuperamos datos de producto si esta informada
    if(this.idProducto){
      this.recuperarDatosProducto();
      
    }

    //recuperar categorias para el select
    this.recuperarCategorias();
  }

  onSubmit() {
    if (this.idProducto) {
      this.editarProducto();

    } else {
      this.altaProducto();
    }
  }
  recuperarDatosProducto(){
    this.productoServicio.obtenerProductoPorId(this.idProducto).subscribe({
      next: (datos) => this.producto = datos,
      error:(error: any) => console.log(error)
    })
  }

  recuperarCategorias(){
    this.categoriaServicio.obtenerCategoriasLista().subscribe({
      next: (datos) => this.categorias = datos,
      error:(error: any) => console.log(error)
    })
    
  }

  altaProducto() {
    this.productoServicio.agregarProducto(this.producto).subscribe({
      next: (datos) => this.irListaProductos(),
      error: (error: any) => console.log(error)
    })
  }

   editarProducto() {
    this.productoServicio.editarProducto(this.idProducto, this.producto).subscribe({
      next: (datos) => this.irListaProductos(),
      error: (error: any) => console.log(error)
    })
  }

  irListaProductos() {
    this.enrutador.navigate(['productos'])
  }

}
