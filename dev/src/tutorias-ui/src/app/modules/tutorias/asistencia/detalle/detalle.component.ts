import { Component, OnInit } from '@angular/core';
import { NavegarService } from '../../../../core/navegar.service';
import { Observable } from 'rxjs';
import { AsistenciaTutoria, Tutoria } from '../../../../shared/entities/tutoria';
import { TutoriasService } from '../../../../shared/services/tutorias.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {

  displayedColumns: string[] = ['alumno_nombre', 'alumno_dni', 'alumno_legajo', 'situacion', 'fecha', 'hora', 'acciones'];
  tutorias$: Observable<AsistenciaTutoria[]>; 
  tutoria$: Observable<Tutoria>;

  constructor(
    private navegar: NavegarService,
    private service: TutoriasService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.tutoria$ = this.route.paramMap.pipe(
      switchMap( params => {
        if (params.has('id')) {
          return this.service.buscarTutoria(params.get('id'));
        } else {
          return null;
        }
      })
    );

    this.tutorias$ = this.tutoria$.pipe(
      map( t => t.asistencia)
    )
  }

  volver() {
    this.navegar.volver().subscribe().unsubscribe();
  }
  
  detalle() {
    let s = this.tutoria$.pipe(
      switchMap( t => 
        this.navegar.navegar({
          url: '/sistema/tutorias/detalle/' + t.id,
          params: { }
        })
      )
    ).subscribe(_ => {
      s.unsubscribe();
    })
  }

  agregarTutoria() {
    let s = this.tutoria$.pipe(
      switchMap( t => 
        this.navegar.navegar({
          url: '/sistema/tutorias/asistencia/nueva/seleccionar-persona/' + t.id,
          params: { }
        })
      )
    ).subscribe(_ => {
      s.unsubscribe();
    });
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
