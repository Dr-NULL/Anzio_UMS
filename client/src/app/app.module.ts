import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { ShowOnDirtyErrorStateMatcher, ErrorStateMatcher } from '@angular/material';
import { routes , RouterModule } from './app.routing';
import { materialModules } from './app.material';
import { sharedObjects, entryObjects } from './app.shared.comp';

// Services Constructor
import { HttpService } from './services/config/http.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Services User
import { HeadersService } from './services/config/headers.service';
import { UsuarioService } from './services/usuario.service';


@NgModule({
  declarations: [
    AppComponent
  ].concat(
    routes.map(x => {
      return x.component;
    })
  ).concat(sharedObjects),
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ].concat(materialModules),
  entryComponents: entryObjects,
  providers: [
    HttpService,
    UsuarioService,
    [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: HeadersService,
        multi: true
      }
    ],
    {
      provide: ErrorStateMatcher,
      useClass: ShowOnDirtyErrorStateMatcher
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
