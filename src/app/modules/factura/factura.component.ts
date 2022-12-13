import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiEmployeeService } from 'src/app/services/apiEmployee/api-employee.service';
import { ApiNegocioService } from 'src/app/services/apiNegocio/api-negocio.service';
import { Factura } from 'src/app/shared/models/Factura';
import Swal from 'sweetalert2';
import { ApiFacturaService } from '../../services/apiFactura/api-factura.service';
import { DialogFacturaComponent } from '../dialog-factura/dialog-factura.component';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.scss'],
})
export class FacturaComponent implements OnInit {
  displayedColumns: string[] = [
    'Numero',
    'Fecha',
    'Precio',
    'Descripcion',
    'accion',
  ];
  columns = [
    {
      columnDef: 'Numero',
      header: 'Numero',
      cell: (element: Factura) => `${element.numero}`,
    },
    {
      columnDef: 'Direccion',
      header: 'Direccion',
      cell: (element: Factura) => `${element.fecha}`,
    },
    {
      columnDef: 'Ciudad',
      header: 'Ciudad',
      cell: (element: Factura) => `${element.precio}`,
    },
    {
      columnDef: 'Codigo postal',
      header: 'Codigo postal',
      cell: (element: Factura) => `${element.descripcion}`,
    },
  ];
  dataSource: MatTableDataSource<Factura> = new MatTableDataSource<Factura>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private dialog: MatDialog,
    private apiFacturaService: ApiFacturaService
  ) {}

  ngOnInit(): void {
    this.getAllFacturas();
  }

  //#region Negocio API
  getAllFacturas() {
    this.apiFacturaService.getList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log('Facturas:' + this.dataSource);
      },
      error: (err) => {
        alert('Error while fetching /Factura/ReadAll records!');
      },
    });
  }
  editFactura(row: any) {
    this.dialog
      .open(DialogFacturaComponent, {
        width: '30%',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'Editar') {
          this.getAllFacturas();
        }
      });
  }
  deleteFactura(id: number, nombre: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Factura se eliminará definitivamente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#57ae51',
      cancelButtonColor: '#f44336',
      confirmButtonText: '¡Sí, bórralo!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiFacturaService.delete('p_factura_oid', id).subscribe({
          next: (res) => {
            Swal.fire(
              'Eliminado!',
              `El factura "${nombre}" se ha eliminado correctamente`,
              'success'
            );
            this.getAllFacturas();
          },
          error: (err) => {
            alert(err + 'Error al momento de eliminar factura');
          },
        });
      }
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
  openDialog(): void {
    this.dialog
      .open(DialogFacturaComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'Guardar') {
          this.getAllFacturas();
        }
      });
  }
  //#endregion
}
