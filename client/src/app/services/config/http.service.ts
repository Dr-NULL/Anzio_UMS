import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespSuccess, RespFailed, Fail } from '../../interfaces/api';
import { urlServer } from '../../app.global';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(
    private httpCtrl: HttpClient
  ) { }

  async get<T = any>(url: string) {
    const path = urlServer + url;
    try {
      const obs = this.httpCtrl.get<RespSuccess<T> | RespFailed>(path);
      const prm = obs.toPromise<RespSuccess<T> | RespFailed>();

      const res = await prm;
      if ((res as RespFailed).errors != null) {
        // Error Procesado por el servidor
        throw res;
      } else {
        // Respuesta correcta
        return res as RespSuccess<T>;
      }
    } catch (err) {
      // Error desde el cliente
      throw this.makeGenericErr(err, path);
    }
  }

  async post<T = any>(url: string, data: any) {
    const path = urlServer + url;
    try {
      const obs = this.httpCtrl.post<RespSuccess<T> | RespFailed>(path, JSON.stringify(data));
      const prm = obs.toPromise<RespSuccess<T> | RespFailed>();

      const res = await prm;
      if ((res as RespFailed).errors != null) {
        // Error Procesado por el servidor
        throw res;
      } else {
        // Respuesta correcta
        return res as RespSuccess<T>;
      }
    } catch (err) {
      // Error desde el cliente
      throw this.makeGenericErr(err, path);
    }
  }

  private makeGenericErr(err: any, url: string) {
    const fail: Fail = {
      status: '409',
      title: 'Confilct',
      detail: err.message,
      source: {
        pointer: url,
        parameter: null
      }
    };

    return {
      errors: [fail],
      meta: {
        company: 'Frigosorno S.A.',
        country: 'Chile',
        authors: [
            'Felipe Silva'
        ]
      }
    } as RespFailed;
  }
}
