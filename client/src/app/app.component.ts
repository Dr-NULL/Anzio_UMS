import { MatSnackBar, SimpleSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
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
export class AppComponent implements OnInit {
  title = 'client';
  isLogged = false;
  navOpened = false;

  // Menu recursivo
  treeControl = new NestedTreeControl<Menu>(x => x.children);
  dataSource = new MatTreeNestedDataSource<Menu>();
  hasChild = (_: number, node: Menu) => node.children.length > 0;

  constructor(
    private usuarioServ: UsuarioService,
    private galletaServ: GalletaService,
    private routerCtrl: Router,
    private snackCtrl: MatSnackBar,
    private menuServ: MenuService
  ) {
    this.dataSource.data = [];
    this.routerCtrl.events.subscribe(async (lol) => {
      // Salir en caso de que no sea un cambio de ruta
      if ((lol as any).routerEvent == null) {
        return;
      }

      try {
        // Comprobar usuario System
        const data = await this.usuarioServ.getActive();
        if (data.data.length === 0) {
          this.routerCtrl.navigate(['/setup']);
        }

        // Comprobar Permisos
        this.isLogged = (this.galletaServ.get('data') != null);
        if (this.isLogged) {
          this.loadMenu();
          const path = location.pathname;

        } else if (
          (location.pathname !== '/') &&
          (location.pathname !== '/login') &&
          (location.pathname !== '/setup')
        ) {
          this.routerCtrl.navigate(['']);
        }
      } catch (err) {
        console.log(err);

        this.routerCtrl.navigate(['']);
      }
    });
  }

  async ngOnInit() {
    // Starting Point
    this.navOpened = false;
  }

  async loadMenu() {
    try {
      const res = await this.menuServ.load();
      this.dataSource.data = res.data;
    } catch (err) {
      this.onLogout();
      this.dataSource.data = [];
    }
  }

  navToggle() {
    this.navOpened = !this.navOpened;
  }

  async onLogout() {
    let snack: MatSnackBarRef<SimpleSnackBar>;
    try {
      const res = await this.usuarioServ.logout();

      if (this.isLogged) {
        snack = this.snackCtrl.open(
          'La sessión se ha cerrado correctamente',
          'Aceptar'
        );
      }
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
      this.dataSource.data = [];

      if (this.isLogged) {
        setTimeout(() => {
          snack.dismiss();
        }, 2000);
      }
    }
  }
}
