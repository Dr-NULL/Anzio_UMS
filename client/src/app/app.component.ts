import { MatSnackBar, SimpleSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Component, OnInit, DoCheck } from '@angular/core';
import { UsuarioService } from './services/usuario/usuario.service';
import { GalletaService } from './services/galleta/galleta.service';
import { Router } from '@angular/router';
import { RespFailed } from './interfaces/api';
import { MenuService, Menu } from './services/menu/menu.service';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, DoCheck {
  title = 'client';
  isLoggedBefore = false;
  isLogged = false;
  navOpened = false;

  // Menu recursivo
  treeControl = new NestedTreeControl<Menu>(x => x.children);
  dataSource = new MatTreeNestedDataSource<Menu>();

  constructor(
    private usuarioServ: UsuarioService,
    private galletaServ: GalletaService,
    private routerCtrl: Router,
    private snackCtrl: MatSnackBar,
    private menuServ: MenuService
  ) {}

  ngDoCheck() {
    this.isLogged = (this.galletaServ.get('data') != null);

    if (this.isLogged !== this.isLoggedBefore) {
      this.isLoggedBefore = this.isLogged;
      this.loadMenu();
    }
  }

  async ngOnInit() {
    // Redirects
    try {
      const data = await this.usuarioServ.getActive();
      if (data.data.length === 0) {
        this.routerCtrl.navigate(['/setup']);
      }

      this.loadMenu();
    } catch (err) {
      console.log(err);
    }

    // Starting Point
    this.navOpened = false;
  }

  async loadMenu() {
    try {
      const res = await this.menuServ.load();
      this.dataSource.data = res.data;
    } catch (err) {
      console.log(err);
    }
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
