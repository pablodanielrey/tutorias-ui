import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DebugComponent } from './core/debug/debug.component';
import { Oauth2Component } from './core/oauth2/oauth2.component';
import { LoaderComponent } from './core/loader/loader.component';
import { OidpGuard } from './core/oauth2/oidp.guard';
import { SistemaComponent } from './core/sistema/sistema.component';
import { InicioComponent } from './modules/inicio/inicio.component';
import { ListaComponent } from './modules/tutorias/lista/lista.component';
import { CrearComponent } from './modules/tutorias/crear/crear.component';
import { DetalleComponent } from './modules/tutorias/detalle/detalle.component';
import { ModificarComponent } from './modules/tutorias/modificar/modificar.component';

const routes: Routes = [
  { path: 'debug', component: DebugComponent },
  { path: 'oauth2', component: Oauth2Component }, 
  { path: 'loader', component: LoaderComponent }, 
  {
     path:'sistema',
     canActivate: [OidpGuard],
     component: SistemaComponent,
     children: [
      { path: 'inicio', component: InicioComponent },
      {
        path: 'tutorias',
        children: [
          { path: 'listar', component: ListaComponent },
          { path: 'crear', component: CrearComponent },
          { path: 'detalle/:id', component: DetalleComponent },
          { path: 'modificar/:id', component: ModificarComponent }
        ]
      }
     ]     
  }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
