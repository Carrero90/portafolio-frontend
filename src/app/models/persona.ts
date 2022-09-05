export class Persona {
    public id: number;
    public nombre: string;
    public apellido: string;
    public sobreMi: string;
    public ocupacion: string; 
 
    public urlFoto: string;
 
  

    constructor( id: number, nombre: string, apellido: string, sobreMi: string, ocupacion: string, urlFoto: string ){
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.sobreMi = sobreMi;
        this.ocupacion = ocupacion;
        this.urlFoto = urlFoto;
    }
}