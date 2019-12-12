import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatSnackBar, MatInput } from '@angular/material';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Sexo } from '../../../interfaces/sexo';
import { Area } from '../../../interfaces/area';
import { Cargo } from '../../../interfaces/cargo';
import { Usuario } from '../../../interfaces/usuario';

@Component({
  selector: 'app-card-user',
  templateUrl: './card-user.component.html',
  styleUrls: ['./card-user.component.scss']
})
export class CardUserComponent implements OnInit {
  @ViewChild('txtNombres', { static: true })
  txtNombres: { nativeElement: MatInput };

  @ViewChild('txtApellidoP', { static: true })
  txtApellidoP: { nativeElement: MatInput };

  @ViewChild('txtApellidoM', { static: true })
  txtApellidoM: { nativeElement: MatInput };

  @ViewChild('txtEmail', { static: true })
  txtEmail: { nativeElement: MatInput };

  // Controla la disponibilidad del botón guardar
  valid: boolean;

  // Values
  arrArea: Area[];
  arrCargo: Cargo[];
  arrGenero: Sexo[];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: Usuario,
    private self: MatDialogRef<CardUserComponent>,
    private snackCtrl: MatSnackBar
  ) { }

  ngOnInit() {
    this.txtNombres.nativeElement.value = this.data.nombres;
    this.txtApellidoP.nativeElement.value = this.data.apellidoP;
    this.txtApellidoM.nativeElement.value = this.data.apellidoM;

    if (this.data.email != null) {
      this.txtEmail.nativeElement.value = this.data.email;
    }

    // Comprobar Integridad del Formulario
    this.checkValidation();
  }

  checkValidation() {
    this.valid = true;

    // Check largo caracteres
    if (this.txtNombres.nativeElement.value.length < 3) {
      this.valid = false;
    }
    if (this.txtApellidoP.nativeElement.value.length < 3) {
      this.valid = false;
    }
    if (this.txtApellidoM.nativeElement.value.length < 3) {
      this.valid = false;
    }

    // Chequear Email
    const email = this.txtEmail.nativeElement.value;
    const reg = new RegExp(
      '^[a-zA-Z0-9.!#$%&\'*+/=?^' +
      '_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]' +
      '{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9]' +
      '(?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$',
      'gi'
    );

    if (email.match(reg) == null) {
      this.valid = false;
    }
  }

  onSubmit() {
    this.data.nombres = this.txtNombres.nativeElement.value;
    this.data.apellidoP = this.txtApellidoP.nativeElement.value;
    this.data.apellidoM = this.txtApellidoM.nativeElement.value;
    this.data.email = this.txtEmail.nativeElement.value;
  }

  onCancel() {
    this.self.close();
  }
}
