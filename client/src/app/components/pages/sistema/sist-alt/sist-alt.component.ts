import { Component, AfterViewInit, ɵConsole } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { SistemaService, Sistema } from '../../../../services/sistema/sistema.service';
import { RespFailed } from 'src/app/interfaces/api';

import { SistemaToggleComponent } from '../../../shared/dialog/sistema-toggle/sistema-toggle.component';
import { SistemaEditComponent } from '../../../shared/dialog/sistema-edit/sistema-edit.component';

@Component({
  selector: 'app-sist-alt',
  templateUrl: './sist-alt.component.html',
  styleUrls: ['./sist-alt.component.scss']
})
export class SistAltComponent implements AfterViewInit {
  dataSource: Sistema[] = [];
  dataCols = [ 'icon', 'nombre', 'descripc', 'status', 'url', 'edit' ];

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

  onToggle(ref: Sistema) {
    const dialRef = this.dialogCtrl.open(
      SistemaToggleComponent,
      {
        width: '480px',
        height: 'auto',
        data: ref
      }
    );

    dialRef.beforeClosed().subscribe(() => {
      this.ngAfterViewInit();
    });
  }

  onEdit(ref: Sistema) {
    const dialRef = this.dialogCtrl.open(
      SistemaEditComponent,
      {
        width: '100vw',
        height: 'fit-content',
        data: ref
      }
    );

    dialRef.beforeClosed().subscribe(() => {
      this.ngAfterViewInit();
    });
  }
}
