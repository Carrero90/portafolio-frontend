export class Education {
    public id: number;
    public nombreUniversidad: string;
    public yearIngreso:string;
    public yearEgreso:string;
    public carrera: string;
    public descripcion: string;

    constructor( id: number, nombreUniversidad: string, yearIngreso:string, yearEgreso:string, carrera: string, descripcion: string){
        this.id = id;
        this.nombreUniversidad = nombreUniversidad;
        this.yearIngreso = yearIngreso;
        this.yearEgreso = yearEgreso;
        this.carrera = carrera;
        this.descripcion = descripcion;
    }

}
