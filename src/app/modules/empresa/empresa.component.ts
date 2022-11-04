import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ApiEmpresaService } from 'src/app/services/apiEmpresa/api-empresa.service';
import { environment } from '../../../environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DialogEmpresaComponent } from '../dialog-empresa/dialog-empresa.component';

export interface Empresa {
  idEmpresa: string;
  nombre: string;
  direccion: string;
}

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss'],
})
export class EmpresaComponent implements OnInit {
  private apiUrl = environment.apiUrl;
  displayedColumns: string[] = ['Nombre', 'Direccion'];
  columns = [
    {
      columnDef: 'Nombre',
      header: 'Nombre',
      cell: (element: Empresa) => `${element.nombre}`,
    },
    {
      columnDef: 'Direccion',
      header: 'Direccion',
      cell: (element: Empresa) => `${element.direccion}`,
    },
  ];
  dataSource: MatTableDataSource<Empresa> = new MatTableDataSource<Empresa>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private dialog: MatDialog,
    private apiEmpresaService: ApiEmpresaService
  ) {}

  ngOnInit(): void {
    this.getAllEmpresas();
  }
  //#region
  getAllEmpresas() {
    this.apiEmpresaService.getList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.dataSource);
      },
      error: (err) => {
        alert('Error while fetching /Empresa/ReadAll records!');
      },
    });
  }
  //#endregion
  //#region Empresa DIALOG
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
      .open(DialogEmpresaComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'Guardar') {
          this.getAllEmpresas();
        }
      });
  }
  //#endregion
}
