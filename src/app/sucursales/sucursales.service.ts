import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sucursal } from './sucursal.model';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class SucursalesService {
  
  //private urlBase= "http://localhost:8086/api/sucursales";
  //private urlBase = `${environment.apiUrl}/sucursales`;
  private urlBase = 'https://supermercado-backend-1.onrender.com/api/sucursales';
  private clienteHttp = inject(HttpClient);

  obtenerSucursalesLista(): Observable<Sucursal[]>{
    return this.clienteHttp.get<Sucursal[]>(this.urlBase);
    
  }
  obtenerSucursalPorId(id:number){
         return this.clienteHttp.get<Sucursal>(`${this.urlBase}/${id}`)
  }

  agregarSucursal(sucursal: Sucursal ): Observable<Object>{
     return this.clienteHttp.post(this.urlBase, sucursal);
   }


   editarSucursal(id:number, sucursal: Sucursal){
         return this.clienteHttp.put(`${this.urlBase}/${id}`,sucursal);
   }

   eliminarSucursal(id:number){
    return this.clienteHttp.delete(`${this.urlBase}/${id}`)
   }

  constructor() { }
}
