import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {  OAuthService } from 'angular-oauth2-oidc';

import { OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';
import { Oauth2Component } from './oauth2/oauth2.component';
import { Oauth2Service } from './oauth2/oauth2.service';
import { OidpGuard } from './oauth2/oidp.guard';
//import { ErrorComponent } from './error/error.component';

import { SistemaComponent } from './sistema/sistema.component';
import { LoaderComponent } from './loader/loader.component';
import { core } from '@angular/compiler';

import { PreloadParcialComponent } from './preload/preload-parcial/preload-parcial.component';
import { PreloadTotalComponent } from './preload/preload-total/preload-total.component';
import { PreloadService } from './preload/preload.service';
import { DebugComponent } from './debug/debug.component';

import { ErrorComponent as ModalError } from './modal/error/error.component';
import { PermisosService } from './permisos.service';
import { DialogoComponent } from './dialogo/dialogo.component';
import { InfoComponent } from './modal/info/info.component';
import { WarningComponent } from './modal/warning/warning.component';
import { ConfirmComponent } from './modal/confirm/confirm.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatPaginatorModule } from '@angular/material/paginator';
 

const routes: Routes = [
  //{ path: 'error/:error', component: ErrorComponent },
  { path: 'oauth2', component: Oauth2Component },
  { path: 'loader', component: LoaderComponent }
]
  
  //{ path: '**', redirectTo: 'oauth2', pathMatch: 'full' }


@NgModule({
  declarations: [
    Oauth2Component,
    LoaderComponent,
    SistemaComponent,
    PreloadParcialComponent,
    PreloadTotalComponent,
    DebugComponent,
    ModalError,
    DialogoComponent,
    InfoComponent,
    WarningComponent,
    ConfirmComponent
  ],
  entryComponents: [
    ModalError,
    InfoComponent,
    WarningComponent,
    ConfirmComponent    
  ],
  imports: [
    MatExpansionModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatDialogModule,
    MatStepperModule,
    MatMenuModule,
    MatChipsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatSlideToggleModule,
    MatTableModule,
    MatTabsModule,
    MatSortModule,
    MatSelectModule,
    MatTreeModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    MatBadgeModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['http'],
        sendAccessToken: true
      }
    }),
    RouterModule.forChild(routes)
  ],
  exports: [
    MatExpansionModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatDialogModule,
    MatStepperModule,
    MatMenuModule,
    MatSidenavModule,
    MatChipsModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    MatCardModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatTableModule,
    MatTabsModule,
    MatSortModule,
    MatSelectModule,
    MatTreeModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    MatBadgeModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    DialogoComponent
  ],
  providers: [
    PermisosService,
    PreloadService,
    OidpGuard,
    Oauth2Service,
    { provide: OAuthStorage, useValue: localStorage },
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true, disableClose: true}},
    { provide: MAT_DIALOG_DATA, useValue: {} },
  ]
})
export class CoreModule { }


//https://medium.com/@bo.vandersteene/angular-track-is-your-app-in-mobile-tablet-or-desktop-view-c8fb4d7d1c2f

