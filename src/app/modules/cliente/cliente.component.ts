import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiEmployeeService } from 'src/app/services/apiEmployee/api-employee.service';
import { ApiFacturaService } from 'src/app/services/apiFactura/api-factura.service';
import { ApiNegocioService } from 'src/app/services/apiNegocio/api-negocio.service';
import { Cliente } from 'src/app/shared/models/Cliente';
import { Negocio } from 'src/app/shared/models/Negocio';
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
    'Email',
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
      columnDef: 'Apellidos',
      header: 'Apellidos',
      cell: (element: Cliente) => `${element.apellidos}`,
    },
    {
      columnDef: 'Email',
      header: 'Correo electronico',
      cell: (element: Cliente) => `${element.email}`,
    },
    {
      columnDef: 'Negocio',
      header: 'Negocio',
      cell: (element: Negocio) => `${element.Nombre}`,
    },
  ];
  dataSource: MatTableDataSource<Cliente> = new MatTableDataSource<Cliente>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private dialog: MatDialog,
    private apiFacturaService: ApiFacturaService,
    private apiClienteService: ApiClienteService
  ) {}

  ngOnInit(): void {
    // activate filterpredicate to get the posibility to filter by object (negocio)
    this.dataSource.filterPredicate = function (data: Cliente, filter: string) {
      data.negocio.Nombre.toLocaleLowerCase().includes(filter);
      return data.negocio.Nombre.toLocaleLowerCase().includes(filter);
    };
    this.getAllClientes();
  }

  //#region Cliente API
  getAllClientes() {
    this.apiClienteService.getList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
      text: 'Cliente se eliminará definitivamente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#57ae51',
      cancelButtonColor: '#f44336',
      confirmButtonText: '¡Sí, bórralo!',
    }).then((result) => {
      if (result.isConfirmed) {
        //#region Delete Element

        this.apiFacturaService.getAllFacturaOfCliente(id).subscribe({
          next: (res) => {
            var facturasByCliente = res == null ? [] : res;
            // Eliminar un cliente en caso de que no tenga facturas
            if (facturasByCliente.length == 0) {
              this.apiClienteService.delete('p_cliente_oid', id).subscribe({
                next: (res) => {
                  Swal.fire(
                    'Eliminado!',
                    `La cliente '${nombre}' se ha eliminado correctamente`,
                    'success'
                  );
                  this.getAllClientes();
                },
                error: (err) => {
                  alert(err + 'Error al momento de eliminar cliente');
                },
              });
            } else {
              Swal.fire({
                icon: 'warning',
                heightAuto: false,
                title: `¡No se pudo eliminar el cliente '${nombre}'!`,
                text: `El cliente '${nombre}' tiene elementos relacionados.`,
              });
            }
          },
          error: (err) => {
            alert(err + 'Error al momento de devolver facturas del cliente');
          },
        });
        //#endregion
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
