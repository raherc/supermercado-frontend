import { Routes } from '@angular/router';
import { ListaSucursalesComponent } from './sucursales/lista-sucursales.component';
import { FormSucursalesComponent } from './sucursales/form-sucursales.component';
import { ListaProductosComponent } from './productos/lista-productos.component';
import { FormProductosComponent } from './productos/form-productos.component';
import { ListaVentasComponent } from './ventas/lista-ventas.component';
import { ListaCategoriasComponent } from './categorias/lista-categorias.component';
import { FormCategoriasComponent } from './categorias/form-categorias.component';
import { FormVentasComponent } from './ventas/form-ventas.component';

export const routes: Routes = [
    //Sucursales
    { path: 'sucursales', component: ListaSucursalesComponent },
    //   { path: '', redirectTo: 'sucursales', pathMatch: 'full' },
    { path: 'form-sucursales', component: FormSucursalesComponent },
    { path: 'form-sucursales/:id', component: FormSucursalesComponent },
    //Productos
    { path: 'productos', component: ListaProductosComponent },
    { path: 'form-productos', component: FormProductosComponent },
    { path: 'form-productos/:id', component: FormProductosComponent },
    //Ventas
    { path: 'ventas', component: ListaVentasComponent },
    { path: 'form-ventas', component: FormVentasComponent },
    { path: 'form-ventas/:id', component: FormVentasComponent },
    //
    { path: 'categorias', component: ListaCategoriasComponent},
    {path: 'form-categorias', component: FormCategoriasComponent},
    {path: 'form-categorias/:id', component: FormCategoriasComponent   }


];
