import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Education } from '../models/education';

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  private url = 'http://localhost:8080/portafolio/';
  
  

  constructor(private httpCliente: HttpClient) { }

  /**metodo get obtener datos*/
  getEducation(): Observable<Education[]> {
    return this.httpCliente.get<any>(this.url + 'educacion');
      
  }

  //metodo para obtener el detalle de una persona
  getIdEducation(id: number): Observable<Education> {
    return this.httpCliente.get<Education>(this.url + `educacion/${id}`)
  }

  //para eliminar en el backend
  deleteEducation(id: number): Observable<Education> {
    return this.httpCliente.delete<Education>(this.url + `deleteducacion/${id}`);
  }

  //metodo para guardar en el backend

  saveEducation(education: Education):Observable<any>{
    return this.httpCliente.post<Education>(this.url + 'saveeducacion', education);
  }

  //metodo para actualizar
  updateEducation(id: number, education: Education) : Observable<Education> {
    return this.httpCliente.put<any>(this.url + `upeducacion/${id}`, education);
  }

}

