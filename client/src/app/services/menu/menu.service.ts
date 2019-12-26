import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Menu } from '../../interfaces/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor(
    private httpServ: HttpService
  ) { }

  load() {
    return this.httpServ.get<Menu[]>(
      '/menu/domain/SYS_UMS'
    );
  }
}
export { Menu };
