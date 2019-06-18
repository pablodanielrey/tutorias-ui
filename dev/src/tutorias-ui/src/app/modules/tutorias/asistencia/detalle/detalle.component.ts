import { Component, OnInit } from '@angular/core';
import { NavegarService } from '../../../../core/navegar.service';

const TUTORIAS_DATA: any[] = [
  {
    id: 1,
    alumno: {
      apellido: 'Blanco',
      nombre: 'Walter',
      dni: '12344587',
      legajo: '12688/8'
    },
    situacion: 'Económica',
    fecha: new Date()
  },
  {
    id: 2,
    alumno: {
      apellido: 'Pais',
      nombre: 'Emanuel',
      dni: '43210125',
      legajo: '1234/7'
    },
    situacion: 'Otra',
    fecha: new Date()
  },  
];

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {

  displayedColumns: string[] = ['alumno_nombre', 'alumno_dni', 'alumno_legajo', 'situacion', 'fecha', 'hora', 'acciones'];
  tutorias = TUTORIAS_DATA;  
  id: string = '1';

  constructor(private navegar: NavegarService) { }

  ngOnInit() {
  }

  volver() {
    this.navegar.volver().subscribe().unsubscribe();
  }
  
  detalle() {
    let s = this.navegar.navegar({
      url: '/sistema/tutorias/detalle/' + this.id,
      params: { }
    }).subscribe(_ => {
      s.unsubscribe();
    })
  }

  agregarTutoria() {
    let s = this.navegar.navegar({
      url: '/sistema/tutorias/asistencia/nueva/seleccionar-persona/' + this.id,
      params: { }
    }).subscribe(_ => {
      s.unsubscribe();
    })
  }  

  modificar(id: string) {
    let s = this.navegar.navegar({
      url: '/sistema/tutorias/asistencia/editar/' + id,
      params: { }
    }).subscribe(_ => {
      s.unsubscribe();
    })
  }  

  eliminar(id: string) {
    console.log('eliminar');
  }

}
