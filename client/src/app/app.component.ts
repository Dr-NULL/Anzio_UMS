import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './services/usuario.service';
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
    const data = await this.usuarioCtrl.getActive();
    if (data.length === 0) {
      this.routerCtrl.navigate(['/setup']);
    }

    // Starting Point
    this.navOpened = false;
  }

  navToggle() {
    this.navOpened = !this.navOpened;
    console.clear();
    console.log(`nav -> ${this.navOpened}`);
  }
}
