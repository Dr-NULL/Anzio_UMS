import { Component, OnInit, ViewChild } from '@angular/core';
import { CsvService } from '../../../services/csv/csv.service';

@Component({
  selector: 'app-upload-csv',
  templateUrl: './upload-csv.component.html',
  styleUrls: ['./upload-csv.component.scss']
})
export class UploadCsvComponent implements OnInit {
  @ViewChild('btnFile', { static: true })
  btnFile: { nativeElement: HTMLInputElement };
  @ViewChild('btnUpload', { static: true })
  btnUpload: { _disabled: boolean; };

  file: File = null;

  constructor(
    private csvServ: CsvService
  ) { }

  ngOnInit() {
    this.btnUpload._disabled = true;
  }

  onClick() {
    this.btnFile.nativeElement.click();
  }

  onChange() {
    this.file = this.btnFile.nativeElement.files[0];
    this.btnUpload._disabled = false;
  }

  async onUpload() {
    if (this.file != null) {
      try {
        const res = await this.csvServ.upload([this.file]);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
  }
}
