import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TutoriasService {

  constructor() { }

  buscarPersonas(texto: string): Observable<any[]> {
    return of([{
      'id': '1',
      'nombre': 'Emanuel',
      'apellido': 'Pais',
      'dni': '41125478',
      'legajo': '145877/7'
    }]);
  }    
}
