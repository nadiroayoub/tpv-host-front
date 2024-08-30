import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiCajaService } from 'src/app/services/apiCaja/api-caja.service';
import { ApiDuenyoService } from 'src/app/services/apiDuenyo/api-duenyo.service';
import { ApiMesaService } from 'src/app/services/apiMesa/api-mesa.service';
import { ApiNegocioService } from 'src/app/services/apiNegocio/api-negocio.service';
import { Mesa } from 'src/app/shared/models/Mesa';
import Swal from 'sweetalert2';
import { DialogMesaComponent } from '../dialog-mesa/dialog-mesa.component';

@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.component.html',
  styleUrls: ['./mesa.component.scss'],
})
export class MesaComponent implements OnInit {
  displayedColumns: string[] = ['Numero', 'Estado', 'Negocio', 'Accion'];
  columns = [
    {
      columnDef: 'Numero',
      header: 'Numero',
      cell: (element: Mesa) => `${element.Numero}`,
    },
    {
      columnDef: 'Estado',
      header: 'Estado',
      cell: (element: Mesa) => `${element.Estado}`,
    },
  ];
  dataSource: MatTableDataSource<Mesa> = new MatTableDataSource<Mesa>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private dialog: MatDialog,
    private apiMesaService: ApiMesaService,
    private apiDuenyoService: ApiDuenyoService,
    private apiNegocioService: ApiNegocioService
  ) {}

  ngOnInit(): void {
    this.getAllMesas();
  }

  //#region API Mesa
  getAllMesas() {
    this.apiMesaService.getList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert('Error while fetching /Mesas/ReadAll records!');
      },
    });
  }
  editMesa(row: any) {
    this.dialog
      .open(DialogMesaComponent, {
        width: '30%',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'Editar') {
          this.getAllMesas();
        }
      });
  }
  deleteMesa(id: number, numero: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Mesa se eliminará definitivamente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#57ae51',
      cancelButtonColor: '#f44336',
      confirmButtonText: '¡Sí, bórralo!',
      heightAuto: false,
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiMesaService.delete('p_mesa_oid', id).subscribe({
          next: (res) => {
            Swal.fire(
              'Eliminado!',
              `La mesa "${numero}" se ha eliminado correctamente`,
              'success'
            );
            this.getAllMesas();
          },
          error: (err) => {
            alert(err + 'Error al momento de eliminar mesa');
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
      .open(DialogMesaComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'Guardar') {
          this.getAllMesas();
        }
      });
  }
  //#endregion
}
