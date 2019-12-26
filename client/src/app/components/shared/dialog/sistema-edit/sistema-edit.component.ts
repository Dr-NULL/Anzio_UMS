import { Component, OnInit, AfterViewInit, DoCheck, Inject } from '@angular/core';
import { HtmlElem } from 'src/app/decorators';
import { SistemaService, Sistema } from 'src/app/services/sistema/sistema.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MatSnackBar, SimpleSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { RespFailed } from 'src/app/interfaces/api';
import { toBase64 } from 'src/app/tool/file';

@Component({
  selector: 'app-sistema-edit',
  templateUrl: './sistema-edit.component.html',
  styleUrls: ['./sistema-edit.component.scss']
})
export class SistemaEditComponent implements OnInit, AfterViewInit, DoCheck {
  files: File[] = [];

  @HtmlElem()
  txtNombre: HTMLInputElement;

  @HtmlElem()
  txtDescripc: HTMLTextAreaElement;

  @HtmlElem()
  txtUrl: HTMLInputElement;

  @HtmlElem()
  txtDb: HTMLInputElement;

  @HtmlElem()
  txtIcon: HTMLInputElement;

  @HtmlElem()
  btnSave: HTMLButtonElement;

  constructor(
    private sistemaServ: SistemaService,
    private dialogRef: MatDialogRef<SistemaEditComponent>,
    private snackCtrl: MatSnackBar,
    @Inject(MAT_DIALOG_DATA)
    private data: Sistema
  ) { }

  ngOnInit() {
    this.files = [];
    this.txtNombre.value = this.data.nombre;
    this.txtDescripc.value = this.data.descripc;
    this.txtUrl.value = this.data.url;
    this.txtDb.value = this.data.db;
    this.txtIcon.value = this.data.icon;
  }

  ngAfterViewInit() {
    this.btnSave.disabled = true;
  }

  ngDoCheck() {
    // Parseo de data
    this.checkIcon();

    // Checar Campos
    if (this.txtNombre.value.trim().length === 0) {
      this.btnSave.disabled = true;
    } else if (this.txtDescripc.value.trim().length === 0) {
      this.btnSave.disabled = true;
    } else if (this.txtUrl.value.trim().length === 0) {
      this.btnSave.disabled = true;
    } else if (this.txtDb.value.trim().length === 0) {
      this.btnSave.disabled = true;
    } else if (this.txtIcon.value.trim().length === 0) {
      this.btnSave.disabled = true;
    } else {
      this.btnSave.disabled = false;
    }
  }

  checkUrl() {
    let raw = this.txtUrl.value.trim();
    raw = raw.replace(/\/+$/gi, '');

    if (raw.replace(/^https?.\/\//gi, '').match(/^([0-9]{1,3}\.){3}[0-9]{1,3}(:[0-9]{1,5})?$/gi) !== null) {
      // Identificar en caso de que sea una IP
      const arr = raw.match(/[0-9]+/gi);
      console.clear();
      for (let i = 0; i < 4; i++) {
        const num = parseInt(arr[i], 10);
        console.log(`${i} -> ${arr[i]} - ${num}`);
        switch (i + 1) {
          case 1:
          case 2:
          case 3:
            if ((num > 255) || (num < 0)) {
              raw = '';
            }
            break;
          case 4:
            if ((num > 254) || (num < 0)) {
              raw = '';
            }
            break;
          default:
            if ((num > 65535) || (num < 1)) {
              raw = '';
            }
            break;
        }
      }
    } else if (
      (raw.replace(/^https?.\/\//gi, '').match(/^localhost(:[0-9]{1,5})?$/gi) === null) &&
      (raw.replace(/^https?.\/\//gi, '').match(/^(([a-z]|[0-9]|-|_)+\.)+([a-z]|[0-9]|-|_)+(:[0-9]{1,5})?$/gi) === null)
    ) {
      raw = '';
    }

    // Comprobar Puerto
    const port  = raw.match(/:[0-9]+/gi);
    if (port !== null) {
      if (
        (port.length > 1) ||
        (parseInt(port[0], 10) < 1) ||
        (parseInt(port[0], 10) > 65535)
      ) {
        raw = '';
      }
    }

    this.txtUrl.value = raw;

    this.onFocusOut();
  }

  checkIcon() {
    let raw = this.txtIcon.value.trim();
    raw = raw.replace(/(<i\s+class="|"><\/i>)/gi, '');
    this.txtIcon.value = raw;
  }

  onFocusOut() {
    this.txtNombre.value = this.txtNombre.value.trim();
    this.txtDescripc.value = this.txtDescripc.value.trim();
    this.txtUrl.value = this.txtUrl.value.trim();
    this.txtDb.value = this.txtDb.value.trim();
    this.txtIcon.value = this.txtIcon.value.trim();
  }

  async onSave() {
    let snack: MatSnackBarRef<SimpleSnackBar>;

    try {
      const data: Sistema = {
        id: this.data.id,
        nombre: this.txtNombre.value,
        descripc: this.txtDescripc.value,
        url: this.txtUrl.value,
        db: this.txtDb.value,
        icon: this.txtIcon.value
      };

      if (this.files.length > 0) {
        data.img = await toBase64(this.files[0]);
      } else {
        data.img = null;
      }

      await this.sistemaServ.edit(data);
      this.btnSave.disabled = true;
      this.files = [];
      this.txtNombre.value = '';
      this.txtDescripc.value = '';
      this.txtUrl.value = '';
      this.txtDb.value = '';
      this.txtIcon.value = '';

      snack = this.snackCtrl.open('Sistema Editado Correctamente!', 'Aceptar', { duration: 2500 });
    } catch (err) {
      snack = this.snackCtrl.open((err as RespFailed).errors[0].details, 'Aceptar', { duration: 2500 });
    } finally {
      this.dialogRef.close();
    }
  }

  onDismiss() {
    this.dialogRef.close();
  }
}
