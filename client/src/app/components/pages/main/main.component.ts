import { Component, OnInit, DoCheck } from '@angular/core';
import { Usuario } from '../../../interfaces/usuario';
import { GalletaService } from '../../../services/galleta/galleta.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements DoCheck {
  data: Usuario;
  pages: Pages[] = [
    {
      url: 'http://192.168.20.218/',
      img: 'assets/img/logos/logo-zebra.png',
      title: 'Reimpresión de Etiquetas',
      color: 'yellow'
    },
    {
      url: 'http://192.168.20.218/',
      img: 'assets/img/logos/logo-zebra.png',
      title: 'Reimpresión de Etiquetas',
      color: 'green'
    },
    {
      url: 'http://192.168.20.218/',
      img: 'assets/img/logos/logo-zebra.png',
      title: 'Reimpresión de Etiquetas',
      color: 'blue'
    },
    {
      url: 'http://192.168.20.218/',
      img: 'assets/img/logos/logo-zebra.png',
      title: 'Reimpresión de Etiquetas',
      color: 'red'
    }
  ];

  constructor(
    private galletaServ: GalletaService
  ) {
  }

  ngDoCheck() {
    this.data = this.galletaServ.get('data');
  }
}

interface Pages {
  img: string;
  url: string;
  title: string;
  color: 'yellow' | 'blue' | 'green' | 'red';
}
