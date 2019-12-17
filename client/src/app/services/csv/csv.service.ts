import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class CsvService {

  constructor(
    private httpServ: HttpService
  ) { }

  async upload(files: File[]) {
    return await this.httpServ.uploadFile<string>(
      '/csv/upload',
      files
    );
  }
}
