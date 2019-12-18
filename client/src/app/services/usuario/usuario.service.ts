import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Usuario } from '../../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(
    private httpCtrl: HttpService
  ) {}

  getAll() {
    return this.httpCtrl.get<Usuario[]>(
      '/usuario/get/'
    );
  }

  getById(id: number) {
    return this.httpCtrl.get<Usuario>(
      '/usuario/get/' + String(id)
    );
  }

  getActive() {
    return this.httpCtrl.get<Usuario[]>(
      '/usuario/get-active'
    );
  }

  gotoSetup() {
    return this.httpCtrl.get<boolean>(
      '/usuario/goto-setup'
    );
  }

  getNewSysPass() {
    return this.httpCtrl.get<string>(
      '/usuario/system/gen-pass'
    );
  }

  login(nick: string, pass: string) {
    return this.httpCtrl.post<Usuario>(
      '/usuario/login',
      { nick, pass }
    );
  }

  logout() {
    return this.httpCtrl.get<void>(
      '/usuario/logout'
    );
  }
}
