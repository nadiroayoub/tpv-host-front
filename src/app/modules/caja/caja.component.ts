import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiEmpresaService } from 'src/app/services/apiEmpresa/api-empresa.service';
import { ApiNegocioService } from 'src/app/services/apiNegocio/api-negocio.service';
import { Caja } from 'src/app/shared/models/Caja';
import Swal from 'sweetalert2';
import { ApiCajaService } from '../../services/apiCaja/api-caja.service';
import { ApiDuenyoService } from '../../services/apiDuenyo/api-duenyo.service';
import { DialogCajaComponent } from '../dialog-caja/dialog-caja.component';

@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.scss'],
})
export class CajaComponent implements OnInit {
  displayedColumns: string[] = [
    'Descripcion',
    'Fondo',
    'Saldo',
    'Negocio',
    'Accion',
  ];
  columns = [
    {
      columnDef: 'Descripcion',
      header: 'Descripcion',
      cell: (element: Caja) => `${element.Descripcion}`,
    },
    {
      columnDef: 'Fondo',
      header: 'Fondo',
      cell: (element: Caja) => `${element.Fondo}`,
    },
    {
      columnDef: 'Saldo',
      header: 'Saldo',
      cell: (element: Caja) => `${element.Saldo}`,
    },
  ];

  dataSource: MatTableDataSource<Caja> = new MatTableDataSource<Caja>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private dialog: MatDialog,
    private apiCajaService: ApiCajaService,
    private apiDuenyoService: ApiDuenyoService,
    private apiNegocioService: ApiNegocioService
  ) {}

  ngOnInit(): void {
    this.getAllCajas();
  }

  //#region Caja API
  getAllCajas() {
    this.apiCajaService.getList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert('Error while fetching /Caja/ReadAll records!');
      },
    });
  }
  editCaja(row: any) {
    this.dialog
      .open(DialogCajaComponent, {
        width: '30%',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'Editar') {
          this.getAllCajas();
        }
      });
  }
  deleteCaja(id: number, nombre: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Caja se eliminará definitivamente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#57ae51',
      cancelButtonColor: '#f44336',
      confirmButtonText: '¡Sí, bórralo!',
      heightAuto: false,
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiCajaService.delete('p_caja_oid', id).subscribe({
          next: (res) => {
            Swal.fire(
              'Eliminado!',
              `El caja "${nombre}" se ha eliminado correctamente`,
              'success'
            );
            this.getAllCajas();
          },
          error: (err) => {
            alert(err + 'Error al momento de eliminar caja');
          },
        });
      }
    });
  }
  //#endregion

  //#region Caja DIALOG
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toUpperCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openDialog(): void {
    this.dialog
      .open(DialogCajaComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'Guardar') {
          this.getAllCajas();
        }
      });
  }
  //#endregion
}
