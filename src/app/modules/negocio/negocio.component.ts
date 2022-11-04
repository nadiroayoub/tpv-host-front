import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogNegocioComponent } from '../dialog-negocio/dialog-negocio.component';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { environment } from '../../../environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { ApiNegocioService } from 'src/app/services/apiNegocio/api-negocio.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

export interface Negocio {
  idNegocio: string;
  nombre: string;
  direccion: string;
  ciudad: string;
  cp: string;
  provincia: string;
  pais: string;
}

@Component({
  selector: 'app-negocio',
  templateUrl: './negocio.component.html',
  styleUrls: ['./negocio.component.scss'],
})
export class NegocioComponent implements OnInit {
  private apiUrl = environment.apiUrl;
  displayedColumns: string[] = [
    // 'idNegocio',
    'Nombre',
    'Direccion',
    'Ciudad',
    'CodigoPostal',
    'Provincia',
    'Pais',
    'accion',
  ];
  columns = [
    {
      columnDef: 'Nombre',
      header: 'Nombre',
      cell: (element: Negocio) => `${element.nombre}`,
    },
    {
      columnDef: 'Direccion',
      header: 'Direccion',
      cell: (element: Negocio) => `${element.direccion}`,
    },
    {
      columnDef: 'Ciudad',
      header: 'Ciudad',
      cell: (element: Negocio) => `${element.ciudad}`,
    },
    {
      columnDef: 'Codigo postal',
      header: 'Codigo postal',
      cell: (element: Negocio) => `${element.cp}`,
    },
    {
      columnDef: 'Provincia',
      header: 'Provincia',
      cell: (element: Negocio) => `${element.provincia}`,
    },
    {
      columnDef: 'Pais',
      header: 'Pais',
      cell: (element: Negocio) => `${element.pais}`,
    },
  ];
  dataSource: MatTableDataSource<Negocio> = new MatTableDataSource<Negocio>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private dialog: MatDialog,
    private apiNegocioService: ApiNegocioService
  ) {}

  ngOnInit(): void {
    this.getAllNegocios();
  }

  //#region
  getAllNegocios() {
    this.apiNegocioService.getList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.dataSource);
      },
      error: (err) => {
        alert('Error while fetching /Negocio/ReadAll records!');
      },
    });
  }
  //#endregion
  //#region NEGOCIO DIALOG
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toUpperCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  filterBySubject() {
    // let filterFunction = (data: Empleado
    //     const Nombre = data.Nombre;
    //     for (let i = 0; i < subjects.length; i++) {
    //       if (subjects[i].indexOf(filter) != -1) {
    //         return true;
    //       }
    //     }
    //     return false;
    //   } else {
    //     return true;
    //   }
    // };
    // return filterFunction;
  }
  openDialog(): void {
    this.dialog
      .open(DialogNegocioComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'Guardar') {
          this.getAllNegocios();
        }
      });
  }
  //#endregion
}
