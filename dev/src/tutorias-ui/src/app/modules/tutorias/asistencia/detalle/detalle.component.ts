import { Component, OnInit } from '@angular/core';
import { NavegarService } from '../../../../core/navegar.service';
import { Observable } from 'rxjs';
import { AsistenciaTutoria, Tutoria } from '../../../../shared/entities/tutoria';
import { TutoriasService } from '../../../../shared/services/tutorias.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map, filter, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { EliminarComponent } from '../eliminar/eliminar.component';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {

  displayedColumns: string[] = ['alumno_nombre', 'alumno_dni', 'alumno_legajo', 'situacion', 'fecha', 'hora', 'acciones'];
  tutorias$: Observable<AsistenciaTutoria[]>; 
  tutoria$: Observable<Tutoria>;

  subscriptions = [];

  constructor(
    private navegar: NavegarService,
    private service: TutoriasService,
    private route: ActivatedRoute,
    public dialog: MatDialog
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

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }  

  volver() {
    this.subscriptions.push(this.navegar.volver('/sistema/tutorias/listar', {}).subscribe());
  }
  
  detalle() {
    this.subscriptions.push(this.tutoria$.pipe(
      switchMap( t => 
        this.navegar.navegar({
          url: '/sistema/tutorias/detalle/' + t.id,
          params: { }
        })
      )
    ).subscribe(_ => {}));
  }

  agregarTutoria() {
    this.subscriptions.push(this.tutoria$.pipe(
      switchMap( t => 
        this.navegar.navegar({
          url: '/sistema/tutorias/asistencia/nueva/seleccionar-persona/' + t.id,
          params: { }
        })
      )
    ).subscribe(_ => {}));
  }  

  modificar(id: string) {
    this.subscriptions.push(this.navegar.navegar({
      url: '/sistema/tutorias/asistencia/editar/' + id,
      params: { }
    }).subscribe(_ => {}));
  }  

  eliminar(asistencia: AsistenciaTutoria) {
    const dialogRef = this.dialog.open(EliminarComponent, {
      width: '250px',
      data: asistencia
    });
    dialogRef.afterClosed().subscribe( res => {
      if (res) {
        this.tutorias$ = this.tutorias$.pipe(
          map(ts => ts.filter( t => t.id != asistencia.id))
        );
      }
    })
  }

}
