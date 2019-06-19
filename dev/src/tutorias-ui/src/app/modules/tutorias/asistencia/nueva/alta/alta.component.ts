import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { NavegarService } from '../../../../../core/navegar.service';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.scss']
})
export class AltaComponent implements OnInit {

  params$: Observable<any>;

  constructor(private route: ActivatedRoute, private navegar: NavegarService) { }

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

  }

  volver() {
    this.navegar.volver().subscribe().unsubscribe();
  }  

}
