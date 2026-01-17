import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Categoria } from './categoria.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {


  //private urlBase= "http://localhost:8086/api/categorias";
  //private urlBase = `${environment.apiUrl}/categorias`;
  private urlBase = 'https://supermercado-backend-1.onrender.com/api/categorias';
  private clienteHttp = inject(HttpClient);

  obtenerCategoriasLista(): Observable<Categoria[]>{
    return this.clienteHttp.get<Categoria[]>(this.urlBase);
    
  }
  obtenerCategoriaPorId(id:number){
         return this.clienteHttp.get<Categoria>(`${this.urlBase}/${id}`)
  }

  agregarCategoria(categoria: Categoria ): Observable<Object>{
     return this.clienteHttp.post(this.urlBase, categoria);
   }


   editarCategoria(id:number, categoria: Categoria){
         return this.clienteHttp.put(`${this.urlBase}/${id}`,categoria);
   }

   eliminarCategoria(id:number){
    return this.clienteHttp.delete(`${this.urlBase}/${id}`)
   }

  constructor() { }
}
