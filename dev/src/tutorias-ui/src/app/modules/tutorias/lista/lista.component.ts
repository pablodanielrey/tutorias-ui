import { Component, OnInit } from '@angular/core';
import { NavegarService } from '../../../core/navegar.service';
import { TutoriasService } from '../../../shared/services/tutorias.service';
import { Tutoria } from '../../../shared/entities/tutoria';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {
  displayedColumns: string[] = ['tutor', 'fecha', 'alumnos', 'acciones'];
  tutorias$: Observable<Array<Tutoria>>;

  constructor(private navegar: NavegarService, private service: TutoriasService) { }

  ngOnInit() {
    this.tutorias$ = this.service.listarTutorias(null, null);
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
