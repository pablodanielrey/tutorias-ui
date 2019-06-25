import { Component, OnInit } from '@angular/core';
import { NavegarService } from '../../../../../core/navegar.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-seleccionar-persona',
  templateUrl: './seleccionar-persona.component.html',
  styleUrls: ['./seleccionar-persona.component.scss']
})
export class SeleccionarPersonaComponent implements OnInit {

  subscriptions = [];
  id$: Observable<string>;

  constructor(
    private navegar: NavegarService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id$ = this.route.paramMap.pipe(
      switchMap( params => {
        if (params.has('id')) {
          return params.get('id');
        } else {
          return null;
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }  

  volver() {
    this.subscriptions.push(this.navegar.volver().subscribe());
  }

  seleccionado(personas) {
    let ids = personas.map( p => p.id);
    this.subscriptions.push(this.id$.pipe(
      switchMap( id => {
        return this.navegar.navegar({
          url: '/sistema/tutorias/asistencia/nueva/alta/'+id,
          params: { ids: ids}
        })
      })
    ).subscribe());
  }

}
