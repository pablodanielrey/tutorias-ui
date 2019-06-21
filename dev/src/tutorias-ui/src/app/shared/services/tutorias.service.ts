import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tutoria, AsistenciaTutoria } from '../entities/tutoria';
import { Usuario } from '../entities/usuario';

@Injectable({
  providedIn: 'root'
})
export class TutoriasService {

  constructor() { }

  buscarPersonas(texto: string): Observable<Usuario[]> {
    return null;
  }
  
  crearTutoria(data: any): Observable<string> {
    return null;
  }

  listarTutorias(inicio: Date, fin: Date): Observable<any[]> {
    return null;
  }

  modificarTutoria(tutoria: Tutoria): Observable<string> {
    return null;
  }

  eliminarTutoria(id: string): Observable<boolean> {
    return null;
  }

  buscarTutoria(id: string): Observable<Tutoria> {
    return null;
  }

  modificarAsistencia(asistencia: AsistenciaTutoria): Observable<string> {
    return null;
  }

  eliminarAsistencia(id: string): Observable<boolean> {
    return null;
  }

  agregarAsistencia(id: string, asistencia: AsistenciaTutoria): Observable<string> {
    return null;
  }
}
