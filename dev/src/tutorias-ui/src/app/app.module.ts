import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { InicioComponent } from './modules/inicio/inicio.component';
import { ListaComponent } from './modules/tutorias/lista/lista.component';
import { CrearComponent } from './modules/tutorias/crear/crear.component';
import { ModificarComponent } from './modules/tutorias/modificar/modificar.component';
import { DetalleComponent } from './modules/tutorias/detalle/detalle.component';
import { SeleccionarPersonaComponent } from './modules/tutorias/asistencia/nueva/seleccionar-persona/seleccionar-persona.component';
import { AltaComponent } from './modules/tutorias/asistencia/nueva/alta/alta.component';
import { EditarComponent } from './modules/tutorias/asistencia/editar/editar.component';
import { DetalleComponent as DetalleAsistenciaComponent } from './modules/tutorias/asistencia/detalle/detalle.component';
import { TutoriasService } from './shared/services/tutorias.service';
import { SeleccionarUsuarioComponent } from './shared/components/seleccionar-usuario/seleccionar-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EliminarComponent as EliminarAsistenciaComponent} from './modules/tutorias/asistencia/eliminar/eliminar.component';
import { EliminarComponent as EliminarTutoriaComponent } from './modules/tutorias/eliminar/eliminar.component';
import { TutoriasMaterialModule } from './tutorias-material.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ListaComponent,
    CrearComponent,
    ModificarComponent,
    DetalleComponent,
    SeleccionarPersonaComponent,
    SeleccionarUsuarioComponent,
    AltaComponent,
    EditarComponent,
    DetalleAsistenciaComponent,
    EliminarAsistenciaComponent,
    EliminarTutoriaComponent
  ],
  entryComponents: [
    EliminarAsistenciaComponent,
    EliminarTutoriaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,    
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    CoreModule,
    TutoriasMaterialModule,
    BrowserAnimationsModule
  ],
  providers: [
    TutoriasService,
    {provide: MAT_DATE_LOCALE, useValue: 'es-AR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
