import { Component, DoCheck, AfterViewInit } from '@angular/core';
import { Usuario } from '../../../interfaces/usuario';
import { GalletaService } from '../../../services/galleta/galleta.service';
import { SistemaService, Sistema } from '../../../services/sistema/sistema.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements DoCheck, AfterViewInit {
  data: Usuario;
  pages: Sistema[] = [];

  constructor(
    private galletaServ: GalletaService,
    private sistemaServ: SistemaService
  ) {}

  ngDoCheck() {
    // Cargar Galleta
    this.data = this.galletaServ.get('data');
  }

  async ngAfterViewInit() {
    try {
      // Cargar Sistemas
      const res = await this.sistemaServ.getActive();
      if (this.pages !== res.data) {
        this.pages = res.data;
      }

    } catch (err) {
      console.log(err);
    }
  }
}
