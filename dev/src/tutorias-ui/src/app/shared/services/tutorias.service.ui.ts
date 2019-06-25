import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Usuario } from '../entities/usuario';
import { Tutoria, AsistenciaTutoria } from '../entities/tutoria';
import { delay, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

const USUARIO_API_URL = environment.usuarioApiUrl;

@Injectable({
  providedIn: 'root'
})
export class TutoriasService {
  id_actual = 3;
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
          id: '2',
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
    }),
    new Tutoria({
      id: '2',
      fecha: new Date(),
      aula: '101',
      tutor: new Usuario({
        id: '3',
        apellido: 'Pais',
        nombre: 'Emanuel',
        dni: '1234'
      }),
      asistencia: [
        new AsistenciaTutoria({
          id: '1',
          alumno: new Usuario({
            id: '3',
            apellido: 'Rey',
            nombre: 'Pablo',
            dni: '41123987',
            legajo: '656733/8'
          }),
          situacion: 'Económica'
        })
      ],
      nro_alumnos: 1
    }),
    new Tutoria({
      id: '3',
      fecha: new Date('06-20-2019'),
      aula: '101',
      tutor: new Usuario({
        id: '3',
        apellido: 'Pais',
        nombre: 'Emanuel',
        dni: '1234'
      }),
      asistencia: [
        new AsistenciaTutoria({
          id: '4',
          alumno: new Usuario({
            id: '2',
            apellido: 'Rey',
            nombre: 'Pablo',
            dni: '41123987',
            legajo: '656733/8'
          }),
          situacion: 'Económica'
        }),
        new AsistenciaTutoria({
          id: '5',
          alumno: new Usuario({
            id: '4',
            apellido: 'Pais',
            nombre: 'Emanuel',
            dni: '39147896',
            legajo: '456787/8'
          }),
          situacion: 'Económica'
        })
      ],
      nro_alumnos: 2
    })  
  ];

  constructor(private http: HttpClient) { }

  buscarPersonas(texto: string): Observable<Usuario[]> {
    const options = { params: new HttpParams()
      .set('q', texto ? texto : 'algoquenoexiste')
    };
    let apiUrl = `${USUARIO_API_URL}/usuarios`;
    return this.http.get<Usuario[]>(apiUrl, options);

    // return of([new Usuario({
    //   'id': '1',
    //   'nombre': 'Emanuel',
    //   'apellido': 'Pais',
    //   'dni': '41125478',
    //   'legajo': '145877/7'
    // }), new Usuario({
    //   'id': '2',
    //   'nombre': 'Walter',
    //   'apellido': 'Blanco',
    //   'dni': '45874147',
    //   'legajo': '785877/8'
    // })]).pipe(delay(500));
  }  
  
  crearTutoria(data: any): Observable<string> {
    let t = new Tutoria(data);
    this.id_actual = this.id_actual + 1;
    t.id = this.id_actual.toString();
    t.tutor = new Usuario({
      'id': '2',
      'nombre': 'Roberto',
      'apellido': 'Blanco',
      'dni': '45874147',
      'legajo': '785877/8'
    });
    this.tutorias.push(t);
    console.log(t);
    return of(t.id).pipe(delay(500));
  }

  listarTutorias(inicio: Date, fin: Date): Observable<Tutoria[]> {
    return of(this.tutorias).pipe(delay(1000));
  }

  modificarTutoria(tutoria: Tutoria): Observable<string> {
    return null;
  }

  eliminarTutoria(id: string): Observable<boolean> {
    return of(true);
  }

  buscarTutoria(id: string): Observable<Tutoria> {
    return of(this.tutorias.find(t => t.id == id));
  }

  modificarAsistencia(asistencia: AsistenciaTutoria): Observable<string> {
    return null;
  }

  eliminarAsistencia(id: string): Observable<boolean> {
    return of(true);
  }

  agregarAsistencia(id: string, asistencia: AsistenciaTutoria): Observable<string> {
    return null;
  }  
}
