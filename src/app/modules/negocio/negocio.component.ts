import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogNegocioComponent } from '../dialog-negocio/dialog-negocio.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ApiNegocioService } from 'src/app/services/apiNegocio/api-negocio.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Negocio } from 'src/app/shared/models/Negocio';
import { ApiEmployeeService } from '../../services/apiEmployee/api-employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-negocio',
  templateUrl: './negocio.component.html',
  styleUrls: ['./negocio.component.scss'],
})
export class NegocioComponent implements OnInit {
  displayedColumns: string[] = [
    // 'idNegocio',
    'Nombre',
    'Direccion',
    'Ciudad',
    'CodigoPostal',
    'Provincia',
    'Pais',
    'Empresa',
    'accion',
  ];
  columns = [
    {
      columnDef: 'Nombre',
      header: 'Nombre',
      cell: (element: Negocio) => `${element.Nombre}`,
    },
    {
      columnDef: 'Direccion',
      header: 'Direccion',
      cell: (element: Negocio) => `${element.Direccion}`,
    },
    {
      columnDef: 'Ciudad',
      header: 'Ciudad',
      cell: (element: Negocio) => `${element.Cuidad}`,
    },
    {
      columnDef: 'Codigo postal',
      header: 'Codigo postal',
      cell: (element: Negocio) => `${element.Cp}`,
    },
    {
      columnDef: 'Provincia',
      header: 'Provincia',
      cell: (element: Negocio) => `${element.Provincia}`,
    },
    {
      columnDef: 'Pais',
      header: 'Pais',
      cell: (element: Negocio) => `${element.Pais}`,
    },
  ];
  dataSource: MatTableDataSource<Negocio> = new MatTableDataSource<Negocio>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private dialog: MatDialog,
    private apiNegocioService: ApiNegocioService,
    private apiEmployeeService: ApiEmployeeService
  ) {}

  ngOnInit(): void {
    this.getAllNegocios();
  }

  //#region Negocio API
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
  editNegocio(row: any) {
    this.dialog
      .open(DialogNegocioComponent, {
        width: '30%',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'Editar') {
          this.getAllNegocios();
        }
      });
  }
  deleteNegocio(id: number, nombre: string) {
    // Check if negocio has empleados
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Negocio se eliminará definitivamente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#57ae51',
      cancelButtonColor: '#f44336',
      confirmButtonText: '¡Sí, bórralo!',
    }).then((result) => {
      if (result.isConfirmed) {
        //#region Delete Element
        this.apiEmployeeService.getAllEmpleadoByNegocio(id).subscribe({
          next: (res) => {
            var empleadosByNegocio = res == null ? [] : res;
            // Eliminar un negocio en caso de que no tenga empleados
            if (empleadosByNegocio.length == 0) {
              this.apiNegocioService.delete('p_negocio_oid', id).subscribe({
                next: (res) => {
                  Swal.fire(
                    'Eliminado!',
                    `El negocio '${nombre}' se ha eliminado correctamente`,
                    'success'
                  );
                  this.getAllNegocios();
                },
                error: (err) => {
                  alert(err + 'Error al momento de eliminar negocio');
                },
              });
            } else {
              Swal.fire({
                icon: 'warning',
                heightAuto: false,
                title: `¡No se pudo eliminar el negocio '${nombre}'!`,
                text: `El negocio '${nombre}' tiene elementos relacionados.`,
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
