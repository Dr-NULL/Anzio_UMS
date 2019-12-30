import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { toBase64 } from '../../tool/file';

import { UsuarioInt } from '../../interfaces/usuario-int';
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

  async etlUpload(file: File) {
    const raw = await toBase64(file);
    const name = file.name.split(/\./gi);

    return this.httpCtrl.post<{
      vinc: UsuarioInt[],
      edit: UsuarioInt[],
      desv: Usuario[]
    }>(
      '/usuario/etl/import',
      {
        file: raw,
        ext: name[name.length - 1]
      }
    );
  }

  async etlExecute() {
    return this.httpCtrl.get(
      '/usuario/etl/execute'
    );
  }
}
