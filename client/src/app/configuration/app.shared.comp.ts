import { UploadCsvComponent } from '../components/shared/upload-csv/upload-csv.component';
import { ProjTarjetComponent } from '../components/shared/proj-tarjet/proj-tarjet.component';
import { FilePickerComponent } from '../components/shared/file-picker/file-picker.component';

import { SisDeleteComponent } from '../components/shared/dialog/sis-delete/sis-delete.component';

export const sharedObjects: any[] = [
  UploadCsvComponent,
  ProjTarjetComponent,
  FilePickerComponent,

  SisDeleteComponent
];

export const entryObjects: any[] = [
  // CardUserComponent
  SisDeleteComponent
];
