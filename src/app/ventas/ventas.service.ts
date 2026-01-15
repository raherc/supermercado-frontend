import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Venta } from './venta.model';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  private urlBase= "http://localhost:8086/api/ventas";
  private clienteHttp = inject(HttpClient);

  obtenerVentasLista(): Observable<Venta[]>{
    return this.clienteHttp.get<Venta[]>(this.urlBase);
    
  }
  obtenerVentaPorId(id:number){
         return this.clienteHttp.get<Venta>(`${this.urlBase}/${id}`)
  }

  agregarVenta(venta: Venta ): Observable<Object>{
     return this.clienteHttp.post(this.urlBase, venta);
   }


   editarVenta(id:number, venta: Venta){
         return this.clienteHttp.put(`${this.urlBase}/${id}`,venta);
   }

   eliminarVenta(id:number){
    return this.clienteHttp.delete(`${this.urlBase}/${id}`)
   }

  constructor() { }
}
