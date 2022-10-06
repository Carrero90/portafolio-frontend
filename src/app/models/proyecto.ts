import { FileImagen } from "./file-imagen";

export class Proyecto {
    public id: number;
    public nombreProyec: string;
    public descProyecto: string;
    public urlPagina: string;
    public proyectoImagen: FileImagen[]

    constructor( id: number, nombreProyec: string, descProyecto: string, urlPagina: string, proyectoImagen: FileImagen[]){
        this.id = id;
        this.nombreProyec = nombreProyec;
        this.descProyecto = descProyecto;
        this.urlPagina = urlPagina;
        this.proyectoImagen = proyectoImagen;
        
    }
}


