import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Hard } from "../models/hard";







@Injectable({
    providedIn: 'root'
})

export class HardService {
    private url = ' https://back-portafolios.herokuapp.com/portafolio/';


    constructor(private httpCliente: HttpClient) { }

    /**metodo get obtener datos*/
    getHard(): Observable<Hard[]> {
        return this.httpCliente.get<any>(this.url + 'habilidad');

    }

    //metodo para obtener el detalle de una persona
    getIdHard(id: number): Observable<Hard> {
        return this.httpCliente.get<Hard>(this.url + `habilidad/${id}`);
    }

    //para eliminar en el backend
    deleteHard(id: number): Observable<Hard> {
        return this.httpCliente.delete<Hard>(this.url + `delethabilidad/${id}`);
    }

    /**Metodo para agregar al backend */
    saveHard(hard: Hard): Observable<any> {
        return this.httpCliente.post<Hard>(this.url + 'savehabi', hard);
    }

    //metodo para actualizar
    updateHard(id: number, hard: Hard): Observable<Hard> {
        return this.httpCliente.put<any>(this.url + `uphabilidad/${id}`, hard);
    }


}


