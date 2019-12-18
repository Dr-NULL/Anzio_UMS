import { Component, OnInit, ViewChild, DoCheck } from '@angular/core';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { GalletaService } from '../../../services/galleta/galleta.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RespFailed } from '../../../interfaces/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, DoCheck {
  @ViewChild('txtNick', { static: true })
  txtNick: { nativeElement: HTMLInputElement };

  @ViewChild('txtPass', { static: true })
  txtPass: { nativeElement: HTMLInputElement };

  @ViewChild('btnLogin', { static: true })
  btnLogin: { _disabled: boolean };

  constructor(
    private snackCtrl: MatSnackBar,
    private routerCtrl: Router,
    private usuarioServ: UsuarioService,
    private galletaServ: GalletaService
  ) { }

  ngOnInit() {
  }

  ngDoCheck() {
    const nick = this.txtNick.nativeElement.value;
    const pass = this.txtPass.nativeElement.value;

    if ((nick.length < 4) || (pass.length < 4)) {
      this.btnLogin._disabled = true;
    } else {
      this.btnLogin._disabled = false;
    }
  }

  async onLogin() {
    try {
      const res = await this.usuarioServ.login(
        this.txtNick.nativeElement.value,
        this.txtPass.nativeElement.value
      );

      this.galletaServ.new(res.data, 'data', 30);
      this.routerCtrl.navigate(['']);
    } catch (err) {
      const snack = this.snackCtrl.open(
        (err as RespFailed).errors[0].details,
        'Aceptar'
      );

      setTimeout(() => {
        snack.dismiss();
      }, 2000);
    }
  }
}
