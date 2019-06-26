import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tutoria, AsistenciaTutoria, Situacion } from '../entities/tutoria';
import { Usuario } from '../entities/usuario';

import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

const TUTORIAS_API_URL = environment.tutoriasApiUrl;


interface Response {
  status: number,
  response: any
}

@Injectable({
  providedIn: 'root'
})
export class TutoriasService {

  constructor(private http: HttpClient) { }

  buscarPersonas(texto: string): Observable<Usuario[]> {
    return null;
  }
  
  crearTutoria(data: any): Observable<string> {
    /*
    Crea una tutoria con fecha y aula seleccionada
    (Genera QR en la API cuando le da guardar y el tutor es el usuario logueado)
    data: {fecha: date, aula: string}
    */
    return null;
  }

  listarTutorias(inicio: Date, fin: Date): Observable<any[]> {
    let url = `${TUTORIAS_API_URL}/tutorias`;
    let params = {
      inicio: (inicio != null) ? inicio.toISOString() : null,
      fin: (fin != null) ? fin.toISOString() : null
    }
    let req = this.http.get<Response>(url, {params:params}).pipe(
      map(r => r.response),
      map((ts:any[]) => ts.map(t => new Tutoria(t)))
    )
    return req;
  }

  modificarTutoria(tutoria: Tutoria): Observable<string> {
    return null;
  }

  eliminarTutoria(id: string): Observable<boolean> {
    return null;
  }

  buscarTutoria(tid: string): Observable<Tutoria> {
    let url = `${TUTORIAS_API_URL}/tutoria/${tid}`;
    let req = this.http.get<Response>(url).pipe(
      map(r => r.response),
      map(t => new Tutoria(t))
    )
    return req;
  }

  obtenerSituaciones(): Observable<Situacion[]> {
    let url = `${TUTORIAS_API_URL}/situaciones`;
    let req = this.http.get<Response>(url).pipe(
      map(r => r.response),
      map((ts:any[]) => ts.map(t => new Situacion(t)))
    )
    return req;
  }

  modificarAsistencia(asistencia: AsistenciaTutoria): Observable<string> {
    return null;
  }

  eliminarAsistencia(id: string): Observable<boolean> {
    return null;
  }

  agregarAsistencia(id: string, situacion_id: string, alumnos: string[]): Observable<string[]> {
    return null;
  }
}
