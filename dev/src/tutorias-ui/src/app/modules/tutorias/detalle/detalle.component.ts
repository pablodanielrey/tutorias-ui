import { Component, OnInit } from '@angular/core';
import { NavegarService } from '../../../core/navegar.service';
import { Tutoria } from '../../../shared/entities/tutoria';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { TutoriasService } from '../../../shared/services/tutorias.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {

  tutoria$: Observable<Tutoria>;
  subscriptions = [];

  constructor(
    private navegar: NavegarService,
    private route: ActivatedRoute,
    private service: TutoriasService
  ) { }

  ngOnInit() {
    this.tutoria$ = this.route.paramMap.pipe(
      switchMap( params => {
        if (params.has('id')) {
          return this.service.buscarTutoria(params.get('id'));
        } else {
          return null;
        }
      }),
      tap( v => console.log(v))
    );    
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }


  volver() {
    this.subscriptions.push(this.navegar.volver().subscribe());
  }

  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('imprimir').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>TUTORIA</title>
           </style>
        </head>
        <body  onload="window.print();window.close()" >${printContents}
        </body>
      </html>`
    );
    popupWin.document.close();
}

}
