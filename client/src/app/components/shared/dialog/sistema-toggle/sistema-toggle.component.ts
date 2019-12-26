import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SistemaService, Sistema } from '../../../../services/sistema/sistema.service';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { RespFailed } from 'src/app/interfaces/api';

@Component({
  selector: 'app-toggle-sistema',
  templateUrl: './sistema-toggle.component.html',
  styleUrls: ['./sistema-toggle.component.scss']
})
export class SistemaToggleComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: Sistema,
    private sistemaServ: SistemaService,
    private dialogRef: MatDialogRef<SistemaToggleComponent>,
    private snackCtrl: MatSnackBar
  ) { }

  ngOnInit() {
  }

  async onToggle() {
    let snack: MatSnackBarRef<SimpleSnackBar>;

    try {
      await this.sistemaServ.toggle(this.data.id);
      snack = this.snackCtrl.open(
        `Se ha cambiado el estado correctamente.`,
        'Aceptar',
        {
          duration: 2500
        }
      );
    } catch (err) {
      snack = this.snackCtrl.open(
        (err as RespFailed).errors[0].details,
        'Aceptar',
        {
          duration: 3000
        }
      );

    } finally {
      this.dialogRef.close();
    }
  }

  onDismiss() {
    this.dialogRef.close();
  }
}
