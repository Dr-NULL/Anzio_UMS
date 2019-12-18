import { MatSnackBar, SimpleSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Component, OnInit, DoCheck } from '@angular/core';
import { UsuarioService } from './services/usuario/usuario.service';
import { GalletaService } from './services/galleta/galleta.service';
import { Router } from '@angular/router';
import { RespFailed } from './interfaces/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, DoCheck {
  title = 'client';
  isLogged = false;
  navOpened = false;

  constructor(
    private usuarioServ: UsuarioService,
    private galletaServ: GalletaService,
    private routerCtrl: Router,
    private snackCtrl: MatSnackBar
  ) {}

  ngDoCheck() {
    this.isLogged = (this.galletaServ.get('data') != null);
  }

  async ngOnInit() {
    // Redirects
    try {
      const data = await this.usuarioServ.getActive();
      if (data.data.length === 0) {
        this.routerCtrl.navigate(['/setup']);
      }
    } catch (err) {
      console.log(err);
    }

    // Starting Point
    this.navOpened = false;
  }

  navToggle() {
    this.navOpened = !this.navOpened;
  }

  async onLogout() {
    let snack: MatSnackBarRef<SimpleSnackBar>;
    try {
      const res = await this.usuarioServ.logout();
      snack = this.snackCtrl.open(
        'La sessión se ha cerrado correctamente',
        'Aceptar'
      );
    } catch (err) {
      snack = this.snackCtrl.open(
        (err as RespFailed).errors[0].details,
        'Aceptar'
      );
    } finally {
      this.navOpened = false;
      this.routerCtrl.navigate(['']);
      this.galletaServ.kill('session');
      this.galletaServ.kill('data');

      setTimeout(() => {
        snack.dismiss();
      }, 2000);
    }

  }
}
