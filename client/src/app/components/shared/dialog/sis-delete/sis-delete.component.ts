import { Component, OnInit, Inject } from '@angular/core';
import { Sistema } from '../../../../services/sistema/sistema.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-sis-delete',
  templateUrl: './sis-delete.component.html',
  styleUrls: ['./sis-delete.component.scss']
})
export class SisDeleteComponent implements OnInit {
  constructor(
    private ref: MatDialogRef<SisDeleteComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: Sistema
  ) { }

  ngOnInit() {
  }

  onDismiss() {
    this.ref.close();
  }
}
