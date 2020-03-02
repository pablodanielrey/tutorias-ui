// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //tutoriasApiUrl: 'https://api.econo.unlp.edu.ar/tutorias/api/v1.0',
  tutoriasApiUrl: 'http://127.0.0.1:11202/tutorias/api/v1.0',
  loginApiUrl: 'https://api.econo.unlp.edu.ar/login/api/v1.0',
  wardenApiUrl: 'https://api.econo.unlp.edu.ar/warden/api/v1.0',
  oidp_issuer: 'https://oidc.econo.unlp.edu.ar/',
  usuarioApiUrl: 'https://api.econo.unlp.edu.ar/users/api/v2.0',

  client_id: 'tutorias-ui',
  version: '0.0.2',

  loader: {
    cabecera: 'TUTORIAS | FCE',
    version: '0.0.2',
    tituloSistema: 'TUTORIAS',
    subtituloSistema: '',
    desarrolloSistema: 'DiTeSI | Dirección de Tecnologías y Sistemas Informáticos',
    logoSistema: '/assets/img/fce/logofce2018.png',
  }   
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
