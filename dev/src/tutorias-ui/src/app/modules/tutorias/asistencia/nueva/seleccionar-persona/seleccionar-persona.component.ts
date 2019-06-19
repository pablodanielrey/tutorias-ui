import { Component, OnInit } from '@angular/core';
import { NavegarService } from '../../../../../core/navegar.service';

@Component({
  selector: 'app-seleccionar-persona',
  templateUrl: './seleccionar-persona.component.html',
  styleUrls: ['./seleccionar-persona.component.scss']
})
export class SeleccionarPersonaComponent implements OnInit {

  constructor(private navegar: NavegarService) { }

  ngOnInit() {
  }

  volver() {
    this.navegar.volver().subscribe().unsubscribe();
  }

  seleccionado(personas) {
    let ids = personas.map( p => p.id);
    let s = this.navegar.navegar({
      url: '/sistema/tutorias/asistencia/nueva/alta/2',
      params: { ids: ids}
    }).subscribe(_ => {
      s.unsubscribe();
    })
  }

}
