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

  seleccionado(persona) {
    // this.crear(persona);
    let s = this.navegar.navegar({
      url: '/sistema/tutorias/asistencia/nueva/alta/2/' + persona.id,
      params: { }
    }).subscribe(_ => {
      s.unsubscribe();
    })
  }

}
