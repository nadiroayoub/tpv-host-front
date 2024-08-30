import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiEmpresaService } from 'src/app/services/apiEmpresa/api-empresa.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DialogEmpresaComponent } from '../dialog-empresa/dialog-empresa.component';
import { Empresa } from 'src/app/shared/models/Empresa';
import Swal from 'sweetalert2';
import { ApiNegocioService } from '../../services/apiNegocio/api-negocio.service';

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
    'Accion',
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
    private apiEmpresaService: ApiEmpresaService,
    private apiNegocioService: ApiNegocioService
  ) {}

  ngOnInit(): void {
    this.getAllEmpresas();
  }

  //#region Empresa API
  getAllEmpresas() {
    this.apiEmpresaService.getList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert('Error while fetching /Empresa/ReadAll records!');
      },
    });
  }
  editEmpresa(row: any) {
    this.dialog
      .open(DialogEmpresaComponent, {
        width: '30%',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'Editar') {
          this.getAllEmpresas();
        }
      });
  }
  deleteEmpresa(id: number, nombre: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Empresa se eliminará definitivamente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#57ae51',
      cancelButtonColor: '#f44336',
      confirmButtonText: '¡Sí, bórralo!',
    }).then((result) => {
      if (result.isConfirmed) {
        //#region Delete Element
        this.apiNegocioService.getAllNegocioByEmpresa(id).subscribe({
          next: (res) => {
            var negociosByEmpresa = res == null ? [] : res;
            // Eliminar un negocio en caso de que no tenga empleados
            if (negociosByEmpresa.length == 0) {
              this.apiEmpresaService.delete('p_empresa_oid', id).subscribe({
                next: (res) => {
                  Swal.fire(
                    'Eliminado!',
                    `La empresa '${nombre}' se ha eliminado correctamente`,
                    'success'
                  );
                  this.getAllEmpresas();
                },
                error: (err) => {
                  alert(err + 'Error al momento de eliminar empresa');
                },
              });
            } else {
              Swal.fire({
                icon: 'warning',
                heightAuto: false,
                title: `¡No se pudo eliminar la empresa '${nombre}'!`,
                text: `La empresa '${nombre}' tiene elementos relacionados.`,
              });
            }
          },
          error: (err) => {
            alert(err + 'Error al momento de devolver empleados de un negocio');
          },
        });
        //#endregion
      }
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
