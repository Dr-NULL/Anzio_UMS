import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { ShowOnDirtyErrorStateMatcher, ErrorStateMatcher } from '@angular/material';
import { routes , RouterModule } from './configuration/app.routing';
import { materialModules } from './configuration/app.material';
import { sharedObjects, entryObjects } from './configuration/app.shared.comp';

// Services Constructor
import { HttpService } from './services/http/http.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Services User
import { UsuarioService } from './services/usuario/usuario.service';


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
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload'
    })
  ].concat(materialModules),
  entryComponents: entryObjects,
  providers: [
    HttpService,
    UsuarioService,
    {
      provide: ErrorStateMatcher,
      useClass: ShowOnDirtyErrorStateMatcher
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
