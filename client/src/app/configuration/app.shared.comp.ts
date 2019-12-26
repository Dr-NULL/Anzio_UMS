import { UploadCsvComponent } from '../components/shared/upload-csv/upload-csv.component';
import { ProjTarjetComponent } from '../components/shared/proj-tarjet/proj-tarjet.component';
import { FilePickerComponent } from '../components/shared/file-picker/file-picker.component';

import { SistemaToggleComponent } from '../components/shared/dialog/sistema-toggle/sistema-toggle.component';
import { SistemaEditComponent } from '../components/shared/dialog/sistema-edit/sistema-edit.component';

export const sharedObjects: any[] = [
  UploadCsvComponent,
  ProjTarjetComponent,
  FilePickerComponent,
  SistemaToggleComponent,
  SistemaEditComponent
];

export const entryObjects: any[] = [
  // CardUserComponent
  SistemaToggleComponent,
  SistemaEditComponent
];
