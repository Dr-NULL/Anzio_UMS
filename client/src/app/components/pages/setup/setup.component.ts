import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from '../../../interfaces/usuario';

import { MatPaginator, MatDialog } from '@angular/material';
import { CardUserComponent } from '../../shared/card-user/card-user.component';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;

  dataSource = new MatTableDataSource<Usuario>([]);
  tableCols = [
    'nombres',
    'apellidoP',
    'apellidoM',
    'area',
    'cargo',
    'create'
  ];

  constructor(
    private dialogCtrl: MatDialog,
    private usuarioServ: UsuarioService
  ) {}

  async ngOnInit() {
    this.updateTable();
  }

  async updateTable() {
    const data = await this.usuarioServ.getAll();
    this.dataSource = new MatTableDataSource<Usuario>(data);
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(ev: KeyboardEvent) {
    const ref = ev.target as HTMLInputElement;
    this.dataSource.filter = ref.value;
  }

  createUser(ref: Usuario) {
    console.clear();
    console.log(ref);
    const dialog = this.dialogCtrl.open(
      CardUserComponent,
      {
        width: '40vw',
        minWidth: '480px',
        disableClose: true,
        data: ref
      }
    );
  }
}
