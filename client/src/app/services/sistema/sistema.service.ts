import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Sistema } from '../../interfaces/sistema';
export { Sistema };

@Injectable({
  providedIn: 'root'
})
export class SistemaService {
  constructor(
    private httpServ: HttpService
  ) { }

  getById(id: number) {
    return this.httpServ.get<Sistema[]>(
      '/sistema/get/' + String(id)
    );
  }

  getActive() {
    return this.httpServ.get<Sistema[]>(
      '/sistema/get/true'
    );
  }

  getAll() {
    return this.httpServ.get<Sistema[]>(
      '/sistema/get/all'
    );
  }

  add(data: Sistema) {
    return this.httpServ.post(
      '/sistema/add',
      data
    );
  }

  edit(data: Sistema) {
    return this.httpServ.post(
      '/sistema/edit',
      data
    );
  }

  toggle(id: number) {
    return this.httpServ.get(
      '/sistema/toggle/' + String(id)
    );
  }
}
