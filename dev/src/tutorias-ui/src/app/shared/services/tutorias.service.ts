import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TutoriasService {

  constructor() { }

  buscarPersonas(texto: string): Observable<any[]> {
    return null;
  }  
}
