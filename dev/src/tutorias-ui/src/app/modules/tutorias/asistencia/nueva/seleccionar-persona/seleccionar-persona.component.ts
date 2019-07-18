import { Component, OnInit } from '@angular/core';
import { NavegarService } from '../../../../../core/navegar.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest, of } from 'rxjs';
import { switchMap, map, combineAll } from 'rxjs/operators';

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
      map( params => {
        if (params.has('id')) {
          let id = params.get('id');
          return id;
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
    let ids = personas.map(p => p.id);
    let navegar = of(personas.map(p => p.id)).pipe(
      switchMap(r => {
        let ids = this.id$.pipe(
          map(id => {
            return {
              'personas': r,
              'id': id
            };
          })
        )
        return ids;
      }),
      switchMap(r => {
        let id = r['id'];
        let ids = r['personas'];
        let data = {
          id: id,
          ids: ids
        };
        let param = btoa(JSON.stringify(data));
        return this.navegar.navegar({
          url: `/sistema/tutorias/asistencia/nueva/alta/${param}`,
          //params: { ids: ids }
          params: null
        })
      })
    );
    this.subscriptions.push(
      navegar.subscribe()
    );
    /*
    this.subscriptions.push(
      combineLatest(this.id$, of(personas.map(p => p.id)))
      .pipe(
        map( resultados => {
          let id = resultados[0];
          let ids = resultados[1];
          return this.navegar.navegar({
            url: `/sistema/tutorias/asistencia/nueva/alta/${id}`,
            params: { ids: ids }
          })
        })
    ).subscribe());
    */
  }

}
