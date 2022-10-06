import { FileImagen } from "./file-imagen";

export class Persona {
    public id: number;
    public nombre: string;
    public apellido: string;
    public sobreMi: string;
    public ocupacion: string; 
    public personaImagen: FileImagen[]
 
  

    constructor( id: number, nombre: string, apellido: string, sobreMi: string, ocupacion: string, personaImagen: FileImagen[] ){
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.sobreMi = sobreMi;
        this.ocupacion = ocupacion;
        this.personaImagen = personaImagen;
    }
}