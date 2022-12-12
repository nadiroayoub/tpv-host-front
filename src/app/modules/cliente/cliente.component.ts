import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiEmployeeService } from 'src/app/services/apiEmployee/api-employee.service';
import { ApiFacturaService } from 'src/app/services/apiFactura/api-factura.service';
import { ApiNegocioService } from 'src/app/services/apiNegocio/api-negocio.service';
import { Cliente } from 'src/app/shared/models/Cliente';
import Swal from 'sweetalert2';
import { ApiClienteService } from '../../services/apiCliente/api-cliente.service';
import { DialogClienteComponent } from '../dialog-cliente/dialog-cliente.component';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
})
export class ClienteComponent implements OnInit {
  displayedColumns: string[] = [
    'DNI',
    'Nombre',
    'Apellidos',
    'Negocio',
    'accion',
  ];
  columns = [
    {
      columnDef: 'DNI',
      header: 'DNI',
      cell: (element: Cliente) => `${element.dni}`,
    },
    {
      columnDef: 'Nombre',
      header: 'Nombre',
      cell: (element: Cliente) => `${element.nombre}`,
    },
    {
      columnDef: 'Apellidos',
      header: 'Apellidos',
      cell: (element: Cliente) => `${element.apellidos}`,
    },
  ];
  dataSource: MatTableDataSource<Cliente> = new MatTableDataSource<Cliente>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private dialog: MatDialog,
    private apiNegocioService: ApiNegocioService,
    private apiEmployeeService: ApiEmployeeService,
    private apiFacturaService: ApiFacturaService,
    private apiClienteService: ApiClienteService
  ) {}

  ngOnInit(): void {
    this.getAllClientes();
  }

  //#region Negocio API
  getAllClientes() {
    this.apiClienteService.getList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(res);
      },
      error: (err) => {
        alert('Error while fetching /Cliente/ReadAll records!');
      },
    });
  }
  editCliente(row: any) {
    this.dialog
      .open(DialogClienteComponent, {
        width: '30%',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'Editar') {
          this.getAllClientes();
        }
      });
  }
  deleteCliente(id: number, nombre: string) {
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
        this.apiClienteService.delete('p_cliente_oid', id).subscribe({
          next: (res) => {
            Swal.fire(
              'Eliminado!',
              `El cliente "${nombre}" se ha eliminado correctamente`,
              'success'
            );
            this.getAllClientes();
          },
          error: (err) => {
            alert(err + 'Error al momento de eliminar cliente');
          },
        });
      }
    });
  }
  //#endregion

  //#region CLIENTE DIALOG
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toUpperCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openDialog(): void {
    this.dialog
      .open(DialogClienteComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'Guardar') {
          this.getAllClientes();
        }
      });
  }
  //#endregion
}
