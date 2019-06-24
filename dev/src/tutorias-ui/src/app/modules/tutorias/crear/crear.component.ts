import { Component, OnInit } from '@angular/core';
import { NavegarService } from '../../../core/navegar.service';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { TutoriasService } from '../../../shared/services/tutorias.service';
import { tap, switchMap } from 'rxjs/operators';
import { PreloadService } from '../../../core/preload/preload.service';
import { ModalService } from '../../../core/modal/modal.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {
  form = this.fb.group({
    fecha: [new Date(), Validators.required],
    aula: ['']
  });

  subscriptions = [];

  constructor(
    private navegar: NavegarService,
    private fb: FormBuilder,
    private service: TutoriasService,
    private preload: PreloadService,
    private modal: ModalService
  ) { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  ngOnInit() {
  }

  volver() {
    this.subscriptions.push(this.navegar.volver().subscribe(_ => {}));
  }

  crear() {
    if (!this.form.valid) {
      return;
    }

    let data = this.form.value;
    
    this.preload.activar_preload_completo();
    this.subscriptions.push(this.service.crearTutoria(data).subscribe(
      id => {
        this.preload.desactivar_preload_completo();
        let nav$ = this.modal.openInfoModal("Nueva Tutoria", "Se ha cargado exitosamente la tutoría").pipe(
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
        this.subscriptions.push(this.modal.openErrorModal("Error al crear la Tutoría: " + err).subscribe( v => {

        }));
      }
    ))
    
  }

}
