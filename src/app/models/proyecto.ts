export class Proyecto {
    public id: number;
    public nombreProyec: string;
    public descProyecto: string;
    public urlImagen: string;
    public urlPagina: string;

    constructor( id: number, nombreProyec: string, descProyecto: string, urlImagen: string, urlPagina: string){
        this.id = id;
        this.nombreProyec = nombreProyec;
        this.descProyecto = descProyecto;
        this.urlImagen = urlImagen;
        this.urlPagina = urlPagina;
        
    }
}


