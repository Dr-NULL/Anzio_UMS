import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, DoCheck } from '@angular/core';

@Component({
  selector: 'app-file-picker',
  templateUrl: './file-picker.component.html',
  styleUrls: ['./file-picker.component.scss']
})
export class FilePickerComponent implements OnInit {
  @ViewChild('txtFile', { static: true })
  txtFile: { nativeElement: HTMLInputElement };

  @ViewChild('objFile', { static: true })
  objFile: { nativeElement: HTMLInputElement };

  modelValue: File[] = [];
  @Input()
  get value() {
    return this.value;
  }
  set value(v: File[]) {
    this.modelValue = v;
    this.valueChange.emit(v);

    if (v.length === 0) {
      this.placeholder = this.hintIdle;
    } else if (v.length === 1) {
      this.placeholder = v[0].name;
    } else {
      this.placeholder = this.hintMany;
    }
  }

  @Output()
  valueChange = new EventEmitter<File[]>();

  // Propiedades
  text = 'Archivo:';
  accept = '*.*';
  hintIdle = 'Seleccione un archivo...';
  hintMany = '"Varios Archivos"';
  placeholder = 'Seleccione un archivo...';

  constructor(
    private objRef: ElementRef<HTMLElement>
  ) {
    // Obtener Propiedades del selector padre
    this.text = this.getAttr('text', this.text);
    this.accept = this.getAttr('accept', this.accept);
    this.hintIdle = this.getAttr('placeholder', this.hintIdle);
    this.placeholder = this.hintIdle;
  }

  getAttr(attr: string, emptyVal: string) {
    const prop = this.objRef
      .nativeElement
      .attributes
      .getNamedItem(attr);

    if (prop != null) {
      return prop.value;
    } else {
      return emptyVal;
    }
  }

  ngOnInit() {
    // Setear Multiple
    if (this.getAttr('multiple', 'false').trim().toLowerCase() === 'true') {
      this.objFile.nativeElement.multiple = true;
    } else {
      this.objFile.nativeElement.multiple = false;
    }
  }

  onClick() {
    this.objFile.nativeElement.click();
  }

  onObjChange() {
    const val = this.objFile.nativeElement.files;
    const data: File[] = [];

    if (val.length > 0) {
      for (let i = 0; i < val.length; i++) {
        data.push(val.item(i));
      }
    }

    if (val.length === 0) {
      this.placeholder = this.hintIdle;
    } else if (val.length === 1) {
      this.placeholder = data[0].name;
    } else {
      this.placeholder = this.hintMany;
    }

    this.value = data;
  }
}
