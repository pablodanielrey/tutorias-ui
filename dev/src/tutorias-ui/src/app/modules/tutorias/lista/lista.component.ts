import { Component, OnInit } from '@angular/core';
import { NavegarService } from '../../../core/navegar.service';

const TUTORIAS_DATA: any[] = [
  {
    id: 1,
    usuario: {
      apellido: 'Blanco',
      nombre: 'Walter',
      dni: '1234'
    },
    fecha: new Date(),
    nro_alumnos: 10
  },
  {
    id: 2,
    usuario: {
      apellido: 'Pais',
      nombre: 'Emanuel',
      dni: '4321'
    },
    fecha: new Date(),
    nro_alumnos: 8
  },  
];

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {
  displayedColumns: string[] = ['tutor', 'fecha', 'alumnos', 'acciones'];
  tutorias = TUTORIAS_DATA;

  constructor(private navegar: NavegarService) { }

  ngOnInit() {
  }

  detalle(id:string) {
    let s = this.navegar.navegar({
      url: '/sistema/tutorias/asistencia/detalle/' + id,
      params: { }
    }).subscribe(_ => {
      s.unsubscribe();
    })
  }

  crearTutoria() {
    let s = this.navegar.navegar({
      url: '/sistema/tutorias/crear',
      params: { }
    }).subscribe(_ => {
      s.unsubscribe();
    })    
  }

}
