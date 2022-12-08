import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiEmpresaService } from 'src/app/services/apiEmpresa/api-empresa.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DialogEmpresaComponent } from '../dialog-empresa/dialog-empresa.component';
import { Empresa } from 'src/app/shared/models/Empresa';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss'],
})
export class EmpresaComponent implements OnInit {
  displayedColumns: string[] = [
    'Cif',
    'Nombre',
    'Direccion',
    'Ciudad',
    'Provincia',
    'CodigoPostal',
    'Pais',
  ];
  columns = [
    {
      columnDef: 'Cif',
      header: 'Cif',
      cell: (element: Empresa) => `${element.cif}`,
    },
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
    {
      columnDef: 'Ciudad',
      header: 'Ciudad',
      cell: (element: Empresa) => `${element.ciudad}`,
    },
    {
      columnDef: 'Provincia',
      header: 'Provincia',
      cell: (element: Empresa) => `${element.provincia}`,
    },
    {
      columnDef: 'CodigoPostal',
      header: 'Codigo Postal',
      cell: (element: Empresa) => `${element.cp}`,
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
        console.log(res);
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
