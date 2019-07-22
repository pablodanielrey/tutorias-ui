import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { NavegarService } from '../../../core/navegar.service';
import { TutoriasService } from '../../../shared/services/tutorias.service';
import { Tutoria } from '../../../shared/entities/tutoria';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { PageEvent, Sort, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { switchMap, map, tap, finalize } from 'rxjs/operators';
import { PreloadService } from '../../../core/preload/preload.service';
import { EliminarComponent } from '../eliminar/eliminar.component';
import { UpdateService } from 'src/app/shared/services/update.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {

  @ViewChild(MatSort, null) sort: MatSort;
  @ViewChild(MatPaginator, null) paginator: MatPaginator;

  // displayedColumns: string[] = ['tutor', 'fecha', 'alumnos', 'acciones'];
  columnasDesktop : string[] = ['tutor', 'fecha', 'alumnos', 'acciones'];
  columnasCelular : string[] = ['tutor', 'fecha', 'alumnos', 'acciones'];
  tutorias$: Observable<Array<Tutoria>> = null;
  tutorias_ordenadas$: Observable<Array<Tutoria>> = null;
  tutorias_paginadas$: Observable<Array<Tutoria>> = null;
  tamano$: Observable<number>;

  buscar$ = new BehaviorSubject<any>(null);
  ordenar$ = new BehaviorSubject<Sort>({active:'tutor',direction:''});
  pagina$ = new BehaviorSubject<PageEvent>({length: 0, pageIndex: 0, pageSize: 10});  

  cargando$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);  

  columnas() {
    /*
      detecta si es un dispositivo touch
    */
    if (typeof window.ontouchstart !== 'undefined') {
      return this.columnasCelular;
    } else {
      return this.columnasDesktop;
    }
  }

  
  constructor(
              private navegar: NavegarService,
              private service: TutoriasService,
              private zone: NgZone,
              public dialog: MatDialog) { 
    
    }

  private ordenar_por_tutor(a: Tutoria, b: Tutoria, direction: string) {
    let n1 = (direction == 'desc') ? a : b;
    let full_name1 = n1.tutor.apellido + ", " + n1.tutor.nombre;
    let n2 = (direction == 'desc') ? b : a;
    let full_name2 = n2.tutor.apellido + ", " + n2.tutor.nombre;
    return (full_name1 == full_name2) ? n1.fecha.getTime() - n2.fecha.getTime() : 
                                       (full_name1 > full_name2) ? -1 : 1;
  }

  private ordenar_por_fecha(a: Tutoria, b: Tutoria, direction: string) {
    let n1 = (direction == 'desc') ? a : b;
    let n2 = (direction == 'desc') ? b : a;
    let diff = n1.fecha.getTime() - n2.fecha.getTime();
    return (diff == 0) ? this.ordenar_por_tutor(a, b, direction) : diff;
  }  

  private ordenar_por_alumnos(a: Tutoria, b: Tutoria, direction: string) {
    let n1 = (direction == 'desc') ? a : b;
    let n2 = (direction == 'desc') ? b : a;
    let diff = n1.nro_alumnos - n2.nro_alumnos;
    return (diff == 0) ? this.ordenar_por_tutor(a, b, direction) : diff;
  }

  ngOnInit() {
    this.cargando$.next(true);
    this.tutorias$ = this.buscar$.pipe(switchMap(_ => this.service.listarTutorias(null, null)));
    this.tamano$ = this.tutorias$.pipe(
      map(ts => (ts != null)? ts.length : 0)
    )

    this.tutorias_ordenadas$ = this.ordenar$.pipe(
      switchMap( orden => {
        return this.tutorias$.pipe(
          tap(_ => this.cargando$.next(true)),
          map( ts => ts.sort((a,b)=> {
            let s = orden;
            switch(s['active']){
              case 'tutor': return this.ordenar_por_tutor(a, b, s["direction"]); break;
              case 'fecha': return this.ordenar_por_fecha(a ,b, s['direction']); break;
              case 'alumnos': return this.ordenar_por_alumnos(a ,b, s['direction']); break;
              default: return this.ordenar_por_tutor(a, b, s["direction"]); break;
            }
          }))
        )
      })
    );

    this.tutorias_paginadas$ = combineLatest(this.pagina$, this.tutorias_ordenadas$).pipe(
      map(valores => {
        let pagina = valores[0];
        let tutorias = valores[1];
        let i = pagina.pageIndex * pagina.pageSize;
        let f = i + pagina.pageSize;
        return tutorias.slice(i,f);
      }),
      tap( _ =>this.cargando$.next(false) )
    )
  }

  ngAfterViewInit() {
    this.sort.sortChange.pipe(
      tap(v => this.cargando$.next(true)),
    ).subscribe(s => {
      this.ordenar$.next(s);
    });

    this.paginator.page.pipe(
      tap(v => console.log(v)),
    ).subscribe(p => {
      this.pagina$.next(p);
    })
  }  

  detalle(id:string) {
    let s = this.navegar.navegar({
      url: '/sistema/tutorias/asistencia/detalle/' + id,
      params: { }
    }).subscribe(_ => {
      s.unsubscribe();
    })
  }

  eliminar(tutoria:Tutoria) {
    const dialogRef = this.dialog.open(EliminarComponent, {
      width: '250px',
      data: tutoria
    });
    dialogRef.afterClosed().subscribe( res => {
      if (res) {
        this.buscar$.next(null);
      }
    });
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
