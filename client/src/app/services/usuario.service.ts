import { Injectable } from '@angular/core';
import { HttpService } from './config/http.service';
import { Usuario } from '../interfaces/usuario';
import { urlServer } from '../app.global';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(
    private httpCtrl: HttpService
  ) {}

  getAll() {
    return this.httpCtrl.get<Usuario[]>(
      urlServer + '/daemon/usuario/get/'
    );
  }
}
