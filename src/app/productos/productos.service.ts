import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Producto } from './producto.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  //private urlBase= "http://localhost:8086/api/productos";
  //private urlBase = `${environment.apiUrl}/productos`;
  private urlBase = 'https://supermercado-backend-1.onrender.com/api/productos';
  private clienteHttp = inject(HttpClient);

  obtenerProductosLista(): Observable<Producto[]>{
    return this.clienteHttp.get<Producto[]>(this.urlBase);
    
  }
  obtenerProductoPorId(id:number){
         return this.clienteHttp.get<Producto>(`${this.urlBase}/${id}`)
  }

  agregarProducto(producto: Producto ): Observable<Object>{
     return this.clienteHttp.post(this.urlBase, producto);
   }


   editarProducto(id:number, producto: Producto){
         return this.clienteHttp.put(`${this.urlBase}/${id}`,producto);
   }

   eliminarProducto(id:number){
    return this.clienteHttp.delete(`${this.urlBase}/${id}`)
   }

  constructor() { }
}
