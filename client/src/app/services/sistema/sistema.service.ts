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

  getAll() {
    return this.httpServ.get<Sistema[]>(
      '/sistema/get'
    );
  }

  async add(data: Sistema) {
    return this.httpServ.post(
      '/sistema/add',
      data
    );
  }
}
