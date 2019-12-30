import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from '../../../../services/usuario/usuario.service';
import { HtmlElem } from '../../../../decorators';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar, MatTableDataSource } from '@angular/material';

import { Usuario } from '../../../../interfaces/usuario';
import { UsuarioInt } from '../../../../interfaces/usuario-int';
import { RespFailed } from 'src/app/interfaces/api';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {
  file: File[] = [];
  complete = [false, false, false, false, false, false];
  loading = false;

  tableVinc: { data: MatTableDataSource<UsuarioInt>, show: string[] } = {
    data: new MatTableDataSource<UsuarioInt>([]),
    show: ['rut', 'nombre', 'area', 'cargo']
  };
  tableEdit: { data: MatTableDataSource<UsuarioInt>, show: string[] } = {
    data: new MatTableDataSource<UsuarioInt>([]),
    show: ['rut', 'nombre', 'area', 'cargo']
  };
  tableDesv: { data: MatTableDataSource<Usuario>, show: string[] } = {
    data: new MatTableDataSource<Usuario>(),
    show: ['rut', 'nombre', 'area', 'cargo']
  };

  @ViewChild('tableVincPage', { static: true })
  tableVincPage;

  @ViewChild('tableEditPage', { static: true })
  tableEditPage;

  @ViewChild('tableDesvPage', { static: true })
  tableDesvPage;

  @HtmlElem()
  btnStep1: HTMLButtonElement;

  @ViewChild('stepper', { static: true })
  stepper: {
    next: () => void,       // Paso Siguiente
    previous: () => void,   // Paso Anterior
    reset: () => void       // Paso Inicial
  };

  constructor(
    private usuarioServ: UsuarioService,
    private snackCtrl: MatSnackBar
  ) { }

  ngOnInit() {
    this.tableVinc.data.paginator = this.tableVincPage;
    this.tableEdit.data.paginator = this.tableEditPage;
    this.tableDesv.data.paginator = this.tableDesvPage;
  }

  onStep1change() {
    if (this.file.length > 0) {
      this.btnStep1.disabled = false;
    } else {
      this.btnStep1.disabled = true;
    }
  }

  async onStep1Click() {
    try {
      // When completes the Process
      this.loading = true;
      this.complete[0] = true;
      const data = await this.usuarioServ.etlUpload(this.file[0]);

      // Data Sources
      this.tableVinc.data.data = data.data.vinc;
      this.tableEdit.data.data = data.data.edit;
      this.tableDesv.data.data = data.data.desv;
      this.loading = false;

      setTimeout(() => {
        this.stepper.next();
      }, 250);
    } catch (err) {
      this.loading = false;
      console.clear();
      console.log(err);
    }
  }

  onStep2Click(next: boolean) {
    if (!next) {
      this.btnStep1.disabled = true;
      this.complete[0] = false;

      this.file = [];
      this.stepper.previous();

    } else {
      this.complete[1] = true;

      setTimeout(() => {
        this.stepper.next();
      }, 250);
    }
  }

  onStep3Click(next: boolean) {
    if (!next) {
      this.btnStep1.disabled = true;
      this.complete[1] = false;

      this.file = [];
      this.stepper.previous();

    } else {
      this.complete[2] = true;

      setTimeout(() => {
        this.stepper.next();
      }, 250);
    }
  }

  async onStep4Click(next: boolean) {
    if (!next) {
      this.btnStep1.disabled = true;
      this.complete[2] = false;

      this.file = [];
      this.stepper.previous();

    } else {
      try {
        this.loading = true;
        this.complete[3] = true;

        setTimeout(() => {
          this.stepper.next();
        }, 250);

        await this.usuarioServ.etlExecute();
        this.loading = false;
      } catch (err) {
        this.loading = false;
        this.snackCtrl.open(
          (err as RespFailed).errors[0].details,
          'Aceptar'
        );
      }
    }
  }

  onReset() {
    for (let i = 0; i < this.complete.length; i++) {
      this.complete[i] = false;
    }
    this.file = [];
    this.loading = false;
    this.btnStep1.disabled = true;

    setTimeout(() => {
      this.stepper.reset();
    }, 250);
  }

  onTableVincFilter(value: string) {
    this.tableVinc.data.filter = value;
  }

  onTableEditFilter(value: string) {
    this.tableEdit.data.filter = value;
  }

  onTableDesvFilter(value: string) {
    this.tableDesv.data.filter = value;
  }
}
