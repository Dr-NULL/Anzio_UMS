import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(
    private httpCtrl: HttpClient
  ) { }

  async get<T = any>(url: string) {
    const obs = this.httpCtrl.get<{ data: T }>(url);
    const prm = obs.toPromise<{ data: T }>();

    return (await prm).data;
  }

  async post<T = any>(url: string, data: any) {
    const obs = this.httpCtrl.post<{ data: T }>(url, JSON.stringify(data));
    const prm = obs.toPromise<{ data: T }>();

    return (await prm).data;
  }
}
