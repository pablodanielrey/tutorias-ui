import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Usuario } from '../entities/usuario';
import { Tutoria, AsistenciaTutoria } from '../entities/tutoria';

@Injectable({
  providedIn: 'root'
})
export class TutoriasService {
  tutorias: Array<Tutoria> = [
    new Tutoria({
      id: '1',
      fecha: new Date(),
      aula: '101',
      tutor: new Usuario({
        id: '3',
        apellido: 'Blanco',
        nombre: 'Walter',
        dni: '1234'
      }),
      asistencia: [
        new AsistenciaTutoria({
          id: '1',
          fecha: new Date(),
          alumno: new Usuario({
            id: '1',
            apellido: 'Pais',
            nombre: 'Emanuel',
            dni: '39147896',
            legajo: '456787/8'
          }),
          situacion: 'Económica'
        }),
        new AsistenciaTutoria({
          id: '1',
          fecha: new Date(),
          alumno: new Usuario({
            id: '2',
            apellido: 'Rey',
            nombre: 'Pablo',
            dni: '41123987',
            legajo: '656733/8'
          }),
          situacion: 'Económica'
        })
      ],
      nro_alumnos: 2
    })  
  ];

  constructor() { }

  buscarPersonas(texto: string): Observable<Usuario[]> {
    return of([new Usuario({
      'id': '1',
      'nombre': 'Emanuel',
      'apellido': 'Pais',
      'dni': '41125478',
      'legajo': '145877/7'
    })]);
  }  
  
  crearTutoria(fecha: Date, aula: string): Observable<string> {
    return null;
  }

  listarTutorias(inicio: Date, fin: Date): Observable<Tutoria[]> {
    return of(this.tutorias);
  }

  modificarTutoria(tutoria: Tutoria): Observable<string> {
    return null;
  }

  eliminarTutoria(id: string): Observable<boolean> {
    return null;
  }

  buscarTutoria(id: string): Observable<Tutoria> {
    return of(this.tutorias.find(t => t.id == id));
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
