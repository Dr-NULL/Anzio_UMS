import { Component, OnInit, DoCheck, AfterViewInit } from '@angular/core';
import { HtmlElem } from 'src/app/decorators';



class InputCtrl {
  private nativeElement: HTMLInputElement;
  public get value(): string {
    return this.nativeElement.value;
  }
  public set value(v: string) {
    this.nativeElement.value = v;
  }

  constructor() {}
}

@Component({
  selector: 'app-sist-add',
  templateUrl: './sist-add.component.html',
  styleUrls: ['./sist-add.component.scss']
})
export class SistAddComponent implements AfterViewInit, DoCheck {
  files: File[] = [];

  @HtmlElem()
  txtNombre: HTMLInputElement;

  @HtmlElem()
  txtDescripc: HTMLTextAreaElement;

  @HtmlElem()
  txtUrl: HTMLInputElement;

  @HtmlElem()
  txtDb: HTMLInputElement;

  @HtmlElem()
  txtIcon: HTMLInputElement;

  @HtmlElem()
  btnSave: HTMLButtonElement;

  constructor(
  ) { }

  ngAfterViewInit() {
    this.files = [];
    this.txtNombre.value = '';
    this.txtDescripc.value = '';
    this.txtUrl.value = '';
    this.txtDb.value = '';
    this.txtIcon.value = '';
    this.btnSave.disabled = true;
  }

  ngDoCheck() {
    // Parseo de data
    this.checkIcon();

    // Checar Campos
    if (this.txtNombre.value.trim().length === 0) {
      this.btnSave.disabled = true;
    } else if (this.txtDescripc.value.trim().length === 0) {
      this.btnSave.disabled = true;
    } else if (this.txtUrl.value.trim().length === 0) {
      this.btnSave.disabled = true;
    } else if (this.txtDb.value.trim().length === 0) {
      this.btnSave.disabled = true;
    } else if (this.txtIcon.value.trim().length === 0) {
      this.btnSave.disabled = true;
    } else if (this.files.length === 0) {
      this.btnSave.disabled = true;
    } else {
      this.txtNombre.value = this.txtNombre.value.trim();
      this.txtDescripc.value = this.txtDescripc.value.trim();
      this.txtUrl.value = this.txtUrl.value.trim();
      this.txtDb.value = this.txtDb.value.trim();
      this.txtIcon.value = this.txtIcon.value.trim();

      this.btnSave.disabled = false;
    }
  }

  checkUrl() {
    let raw = this.txtUrl.value.trim();
    raw = raw.replace(/\/+$/gi, '');

    if (raw.replace(/^https?.\/\//gi, '').match(/^([0-9]{1,3}\.){3}[0-9]{1,3}(:[0-9]{1,5})?$/gi) !== null) {
      // Identificar en caso de que sea una IP
      const arr = raw.match(/[0-9]+/gi);
      console.clear();
      for (let i = 0; i < 4; i++) {
        const num = parseInt(arr[i], 10);
        console.log(`${i} -> ${arr[i]} - ${num}`);
        switch (i + 1) {
          case 1:
          case 2:
          case 3:
            if ((num > 255) || (num < 0)) {
              raw = '';
            }
            break;
          case 4:
            if ((num > 254) || (num < 0)) {
              raw = '';
            }
            break;
          default:
            if ((num > 65535) || (num < 1)) {
              raw = '';
            }
            break;
        }
      }
    } else if (raw.replace(/^https?.\/\//gi, '').match(/^localhost(:[0-9]{1,5})?$/gi) === null) {
      raw = '';
    }

    this.txtUrl.value = raw;
  }

  checkIcon() {
    let raw = this.txtIcon.value.trim();
    raw = raw.replace(/(<i\s+class="|"><\/i>)/gi, '');
    this.txtIcon.value = raw;
  }
}
