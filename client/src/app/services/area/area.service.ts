import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

import { Area } from '../../interfaces/area';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  constructor(
    private httpCtrl: HttpService
  ) { }

  getAll() {
    return this.httpCtrl.get<Area[]>(
      '/cargo/get/'
    );
  }
}
