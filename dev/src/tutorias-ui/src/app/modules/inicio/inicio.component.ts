import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment'
import { UpdateService } from 'src/app/shared/services/update.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  tituloSistema: string;
  subtituloSistema: string;
  desarrolloSistema: string;
  logoSistema: string

  constructor(private update: UpdateService) {
    this.tituloSistema = environment.loader.tituloSistema;
    this.subtituloSistema = environment.loader.subtituloSistema;
    this.desarrolloSistema = environment.loader.desarrolloSistema;
    this.logoSistema = environment.loader.logoSistema
   }

  ngOnInit() {
    this.update.checkForUpdate();
  }

}
