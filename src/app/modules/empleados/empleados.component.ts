import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DialogEmpleadoComponent } from '../dialog-empleado/dialog-empleado.component';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ApiEmployeeService } from 'src/app/services/apiEmployee/api-employee.service';

export interface Empleado {
  DNI: string;
  Nombre: string;
  Apellidos: string;
  Pass: string;
  Foto: string;
}

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.scss'],
})
export class EmpleadosComponent implements OnInit {
  private apiUrl = environment.apiUrl;
  displayedColumns: string[] = ['DNI', 'Nombre', 'Apellidos', 'accion'];
  columns = [
    {
      columnDef: 'DNI',
      header: 'Dni',
      cell: (element: Empleado) => `${element.DNI}`,
    },
    {
      columnDef: 'Nombre',
      header: 'Nombre',
      cell: (element: Empleado) => `${element.Nombre}`,
    },
    {
      columnDef: 'Apellidos',
      header: 'Apellidos',
      cell: (element: Empleado) => `${element.Apellidos}`,
    },
    {
      columnDef: 'Pass',
      header: 'Pass',
      cell: (element: Empleado) => `${element.Pass}`,
    },
    {
      columnDef: 'Foto',
      header: 'Foto',
      cell: (element: Empleado) => `${element.Foto}`,
    },
  ];
  dataSource: MatTableDataSource<Empleado> = new MatTableDataSource<Empleado>(
    []
  );
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private apiEmployeeService: ApiEmployeeService
  ) {}
  ngOnInit(): void {
    this.getAllEmployees();
  }

  //#region Employee API
  editEmployee(row: any) {
    this.dialog
      .open(DialogEmpleadoComponent, {
        width: '30%',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'Editar') {
          this.getAllEmployees();
        }
      });
  }
  getAllEmployees() {
    this.apiEmployeeService.getList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert('Error while fetching Employees:/Empleado/ReadAll records!');
      },
    });
  }
  deleteEmployee(id: number) {
    this.apiEmployeeService.delete('p_empleado_oid', id).subscribe({
      next: (res) => {
        console.log('Employee eliminado');
        this.getAllEmployees();
      },
      error: () => {
        alert('Error al momento de eliminar employee');
      },
    });
  }
  //#endregion

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
      .open(DialogEmpleadoComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'Guardar') {
          this.getAllEmployees();
        }
      });
  }
}
