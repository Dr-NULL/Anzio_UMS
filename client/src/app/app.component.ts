import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UsuarioService } from './services/usuario/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'client';
  navOpened: boolean;

  constructor(
    private usuarioCtrl: UsuarioService,
    private routerCtrl: Router
  ) {}

  async ngOnInit() {
    // Redirects
    try {
      const data = await this.usuarioCtrl.getActive();
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
}
