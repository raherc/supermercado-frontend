import { Component, inject } from '@angular/core';
import { Sucursal } from './sucursal.model';
import { SucursalesService } from './sucursales.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-form-sucursales',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './form-sucursales.component.html',
})
export class FormSucursalesComponent {

  sucursal: Sucursal = new Sucursal();
  idSucursal!: number;

  private sucursalServicio = inject(SucursalesService);
  private ruta = inject(ActivatedRoute)
  private enrutador = inject(Router);

  ngOnInit() {
    this.idSucursal = this.ruta.snapshot.params['id'];
    //ahora vamos al back con este id y recuperamos datos de sucursal si esta informada
    if(this.idSucursal){
      this.recuperarDatosSucursal();
    }
  }

  onSubmit() {
    if (this.idSucursal) {
      this.editarSucursal();

    } else {
      this.altaSucursal();
    }
  }
  recuperarDatosSucursal(){
    this.sucursalServicio.obtenerSucursalPorId(this.idSucursal).subscribe({
      next: (datos) => this.sucursal = datos,
      error:(error: any) => console.log(error)
    })
  }

  altaSucursal() {
    this.sucursalServicio.agregarSucursal(this.sucursal).subscribe({
      next: (datos) => this.irListaSucursales(),
      error: (error: any) => console.log(error)
    })
  }

   editarSucursal() {
    this.sucursalServicio.editarSucursal(this.idSucursal, this.sucursal).subscribe({
      next: (datos) => this.irListaSucursales(),
      error: (error: any) => console.log(error)
    })
  }

  irListaSucursales() {
    this.enrutador.navigate(['sucursales'])
  }
}
