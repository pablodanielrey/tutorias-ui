import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { NavegarService } from '../../../../../core/navegar.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Usuario } from '../../../../../shared/entities/usuario';
import { switchMap } from 'rxjs/operators';
import { TutoriasService } from '../../../../../shared/services/tutorias.service';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.scss']
})
export class AltaComponent implements OnInit {

  form = this.fb.group({
    situacion: ['', Validators.required]
  });

  alumnos$: Observable<Usuario[]>;
  
  params$: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private navegar: NavegarService,
    private service: TutoriasService,
    private fb: FormBuilder
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

    this.alumnos$ = this.params$.pipe(
      switchMap( params => {
        return null;
      })
    )

  }

  volver() {
    this.navegar.volver().subscribe().unsubscribe();
  }  

  crear() {
    let value = this.form.value;
    console.log(value);
  }

}
