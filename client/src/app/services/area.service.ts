import { Injectable } from '@angular/core';
import { HttpService } from './config/http.service';

import { Area } from '../interfaces/area';
import { urlServer } from '../app.global';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  constructor(
    private httpCtrl: HttpService
  ) { }

  getAll() {
    return this.httpCtrl.get<Area[]>(
      urlServer + '/daemon/cargo/get/'
    );
  }
}
