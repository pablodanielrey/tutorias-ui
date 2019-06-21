import { Component, OnInit } from '@angular/core';
import { NavegarService } from '../../../core/navegar.service';
import { FormBuilder, Validators } from '@angular/forms';
import { TutoriasService } from '../../../shared/services/tutorias.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {

  form = this.fb.group({
    tutor: ['', Validators.required],
    fecha: ['', Validators.required],
    aula: ['']
  })

  constructor(
    private navegar: NavegarService,
    private fb: FormBuilder,
    private service: TutoriasService
  ) { }

  ngOnInit() {
  }

  volver() {
    this.navegar.volver().subscribe().unsubscribe();
  }

  crear() {
    if (!this.form.valid) {
      return;
    }

    let data = this.form.value;
    let nueva = this.service.crearTutoria(data);
    
  }

}
