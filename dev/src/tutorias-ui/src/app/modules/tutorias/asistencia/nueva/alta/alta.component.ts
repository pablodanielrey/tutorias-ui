import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { NavegarService } from '../../../../../core/navegar.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Usuario } from '../../../../../shared/entities/usuario';
import { switchMap } from 'rxjs/operators';
import { TutoriasService } from '../../../../../shared/services/tutorias.service';
import { Situacion } from '../../../../../shared/entities/tutoria';
import { PreloadService } from '../../../../../core/preload/preload.service';
import { ModalService } from '../../../../../core/modal/modal.service';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.scss']
})
export class AltaComponent implements OnInit {

  form = this.fb.group({
    situacion: ['', Validators.required]
  });

  situaciones$: Observable<Situacion[]>;
  
  params$: Observable<any>;
  subscriptions = [];

  constructor(
    private route: ActivatedRoute,
    private navegar: NavegarService,
    private service: TutoriasService,
    private fb: FormBuilder,
    private preload: PreloadService,
    private modal: ModalService
  ) { }

  ngOnInit() {
    this.params$ = combineLatest(
      this.route.paramMap,
      this.route.queryParamMap,
      (params: any, queryParams: any) => {
        return {
          "id": params.has('id') ? params.get('id') : null,
          "pids": queryParams.has('ids') ? queryParams.getAll('ids'): []
        }
      }
    );

    this.situaciones$ = this.service.obtenerSituaciones();

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
  volver() {
    this.navegar.volver().subscribe().unsubscribe();
  }  

  crear() {
    if (!this.form.valid) {
      return;
    }
    
    let value = this.form.value;
    let situacion = value['situacion'];
    this.preload.activar_preload_completo();
    let id = '';
    this.subscriptions.push(this.params$.pipe(
      switchMap( params => {
        id = params.id;
        return this.service.agregarAsistencia(params.id, situacion, params.pids);
      })
    ).subscribe(
      res => {
        this.preload.desactivar_preload_completo();
        let nav$ = this.modal.openInfoModal("Nueva Asistencia", "Se ha cargado exitosamente la asistencia").pipe(
          switchMap( v => {
            return this.navegar.navegar({
              url: '/sistema/tutorias/asistencia/detalle/' + id,
              params: {}
            }, false)
          })
        );
        this.subscriptions.push(nav$.subscribe( _ => {}));
      },
      err => {
        this.preload.desactivar_preload_completo();
        this.subscriptions.push(this.modal.openErrorModal("Error al crear la Tutoría: " + err).subscribe());          
      }
    ));
    
  }

}
