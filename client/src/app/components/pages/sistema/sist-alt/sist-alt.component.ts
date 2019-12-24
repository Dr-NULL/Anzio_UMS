import { Component, AfterViewInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { SistemaService, Sistema } from '../../../../services/sistema/sistema.service';
import { RespFailed } from 'src/app/interfaces/api';

import { SisDeleteComponent } from '../../../shared/dialog/sis-delete/sis-delete.component';

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
    private snackCtrl: MatSnackBar,
    private dialogCtrl: MatDialog
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

  onDelete(ref: Sistema) {
    try {
      const dialRef = this.dialogCtrl.open(
        SisDeleteComponent,
        {
          width: '320px',
          height: '240px',
          data: ref
        }
      );
    } catch (err) {

    }
  }
}
