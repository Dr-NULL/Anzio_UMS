import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { Usuario } from '../../../interfaces/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements AfterViewInit {
  @ViewChild('txtNick', { static: true })
  txtNick: { nativeElement: HTMLInputElement };

  @ViewChild('txtPass', { static: true })
  txtPass: { nativeElement: HTMLInputElement };
  txtPassPH = 'Presione en "Generar Contraseña"...';

  user: Usuario;

  constructor(
    private usuarioServ: UsuarioService,
    private routerCtrl: Router
  ) { }

  async ngAfterViewInit() {
    try {
      const res = await this.usuarioServ.getById(1);
      this.user = res.data;
      this.txtNick.nativeElement.value = this.user.nick;
    } catch (err) {
      console.log(err);
      this.routerCtrl.navigate(['']);
    }
  }

  async onReqNewPass() {
    try {
      this.user.pass = (await this.usuarioServ.getNewSysPass()).data;
      this.txtPassPH = 'Nueva Contraseña:';
      this.txtPass.nativeElement.value = this.user.pass;
    } catch (err) {
      this.routerCtrl.navigate(['']);
    }
  }
}
