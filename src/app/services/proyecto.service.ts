import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Proyecto } from '../models/proyecto';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  private url = 'http://localhost:8080/portafolio/';

  constructor(private httpCliente: HttpClient) { }

  /**metodo get obtener datos*/
  getProyecto(): Observable<Proyecto[]> {
    return this.httpCliente.get<any>(this.url + 'proyecto');

  }
  //metodo para obtener el detalle de una persona
  getIdProyecto(id: number): Observable<Proyecto> {
    return this.httpCliente.get<Proyecto>(this.url + `proyecto/${id}`);
  }
  //para eliminar en el backend
  deleteProyecto(id: number): Observable<Proyecto> {
    return this.httpCliente.delete<Proyecto>(this.url + `deletproyecto/${id}`);
  }

  /**metodo para guardar informacion al backend */
  saveProyecto(proyecto: FormData): Observable<any> {
    return this.httpCliente.post<Proyecto>(this.url + 'saveproyecto', proyecto);
  }

  //metodo para actualizar
  updateProyecto(id: number, proyecto: FormData): Observable<Proyecto> {
    return this.httpCliente.put<any>(this.url + `upproyecto/${id}`, proyecto);
  }
}

