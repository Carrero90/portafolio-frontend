import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Persona } from "../models/persona";







@Injectable({
    providedIn: 'root'
})

export class PersonaService {
    private url = ' https://back-portafolios.herokuapp.com/portafolio/';


    constructor(private httpCliente: HttpClient) { }

    /**metodo get obtener datos*/
    getPersona(): Observable<Persona[]> {
        return this.httpCliente.get<any>(this.url + 'personas')
       
    }

    /**metodo para obtener el detalle de una persona */
    getIdPersona(id: number): Observable<Persona> {
        return this.httpCliente.get<Persona>(this.url + `personas/${id}`);
    }

    /**Metodo para guardar en el backend */
    savePersona(persona: FormData): Observable<any> {
        return this.httpCliente.post<Persona>(this.url + 'savepersona', persona);
    }

    /**metodo para eliminar */
    deletePersona(id: number): Observable<Persona> {
        return this.httpCliente.delete<Persona>(this.url + `deletpersona/${id}`);
    }

    /**metodo para actualizar */
    updatePersona(id: number, persona: FormData): Observable<Persona> {
        return this.httpCliente.put<any>(this.url + `uppersona/${id}`, persona);

    }
}



