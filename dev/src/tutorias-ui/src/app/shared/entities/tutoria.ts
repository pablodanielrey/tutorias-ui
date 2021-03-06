import { Usuario } from '../entities/usuario';

export class Tutoria {
    id: string;
    fecha: Date;
    aula: string;
    tutor: Usuario;
    asistencia: Array<AsistenciaTutoria>;
    nro_alumnos: number = 0;

    constructor(o:Object) {
        try {
            Object.assign(this, o);
            this.fecha = new Date(this.fecha);
            this.asistencia = (this.asistencia == null) ? []: this.asistencia.map(t => new AsistenciaTutoria(t));
        } catch(e) {
            console.log(e);
        }
    }     
}

export class AsistenciaTutoria {
    id: string;
    alumno: Usuario;
    situacion: Situacion;

    constructor(o:Object) {
        try {
            Object.assign(this, o);
        } catch(e) {
            console.log(e);
        }
    }       
}

export class Situacion {
    id: string;
    situacion: string;

    constructor(o:Object) {
        try {
            Object.assign(this, o);
        } catch(e) {
            console.log(e);
        }
    }           

}