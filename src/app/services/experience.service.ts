import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Experience } from '../models/experience';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  private url = ' https://back-portafolios.herokuapp.com/portafolio/';
  


  constructor(private httpCliente: HttpClient) { }


   /**metodo get obtener datos*/
   getExperiencia(): Observable<Experience[]> {
    return this.httpCliente.get<any>(this.url + 'experiencia');
    
    }

    /**metodo get por id */
    getIdExperience(id: number): Observable<Experience> {
      return this.httpCliente.get<Experience>(this.url + `experiencia/${id}`)
    }
    
    /**metodo para guardar en el backend */

    saveExperience(experience: Experience): Observable<any>{
        return this.httpCliente.post<Experience>(this.url + 'saveexperiencia', experience);
    }

    /**metodo para actualizar */
    updateExperience(id: number, experience: Experience): Observable<Experience> {
      return this.httpCliente.put<any>(this.url + `upexperiencia/${id}`, experience);

  }

    /**metodo para eliminar */
    deleteExperience(id: number): Observable<Experience> {
      return this.httpCliente.delete<Experience>(this.url + `deletexperiencia/${id}`);
  }
}
