export class Experience {
    public id: number;
    public nombreEmpresa: string;
    public fechaInicio: string;
    public fechaFin: string;
    public descLaboral: string;

    constructor( id: number, nombreEmpresa: string, fechaInicio: string, fechaFin: string, descLaboral: string){
        this.id = id;
        this.nombreEmpresa = nombreEmpresa;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.descLaboral = descLaboral;

    }

}
