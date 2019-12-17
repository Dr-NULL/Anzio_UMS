import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespSuccess, RespFailed, ApiError, ApiErrorSource } from '../../interfaces/api';

const urlServer = 'http://localhost/api';
const urlClient = 'http://localhost:4200';

const opt = {
  withCredentials: true,
  headers: new HttpHeaders({
    'content-type': 'application/vnd.api+json',
    'Access-Control-Allow-Origin': urlClient,
    'Set-Cookie': 'HttpOnly;Secure;SameSite=Strict'
  })
};

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
      const obs = this.httpCtrl.post<RespSuccess<T> | RespFailed>(path, JSON.stringify(data), opt);
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

  async uploadFile<T = any>(url: string, files: File[]) {
    const path = urlServer + url;
    const data = new FormData();
    files.forEach(file => {
      data.append('data', file);
    });

    try {
      const obs = this.httpCtrl.post<RespSuccess<T> | RespFailed>(
        path,
        data,
        {
          withCredentials: true,
          headers: new HttpHeaders({
            // 'content-type': 'multipart/form-data',
            'Access-Control-Allow-Origin': urlClient,
            'Set-Cookie': 'HttpOnly;Secure;SameSite=Strict'
          })
        }
      );
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

  private makeGenericErr(err: Error, url: string) {
    const fail: ApiError = {
      status: '409',
      title: 'Conflict',
      details: err.message,
      stack: err.stack,
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
