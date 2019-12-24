import { Component, AfterViewInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SistemaService, Sistema } from '../../../../services/sistema/sistema.service';
import { RespFailed } from 'src/app/interfaces/api';

@Component({
  selector: 'app-sist-alt',
  templateUrl: './sist-alt.component.html',
  styleUrls: ['./sist-alt.component.scss']
})
export class SistAltComponent implements AfterViewInit {
  dataSource: Sistema[] = [];
  dataCols = [ 'icon', 'nombre', 'descripc', 'url', 'actions' ];

  constructor(
    private sistemaServ: SistemaService,
    private snackCtrl: MatSnackBar
  ) { }

  async ngAfterViewInit() {
    try {
      const res = await this.sistemaServ.getAll();
      this.dataSource = res.data;
    } catch (err) {
      const snack = this.snackCtrl.open((err as RespFailed).errors[0].details);
      setTimeout(() => {
        snack.dismiss();
      }, 3000);
    }
  }

  onEdit(id: number) {

  }

  onDelete(id: number) {

  }
}
