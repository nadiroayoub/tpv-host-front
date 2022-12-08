import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DialogEmpleadoComponent } from '../dialog-empleado/dialog-empleado.component';
import {
  MatDialog,
} from '@angular/material/dialog';
import { ApiEmployeeService } from 'src/app/services/apiEmployee/api-employee.service';
import { Empleado } from 'src/app/shared/models/Empleado';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.scss'],
})
export class EmpleadosComponent implements OnInit {
  displayedColumns: string[] = [
    'Id',
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
      header: 'Dni',
      cell: (element: Empleado) => `${element.Dni}`,
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
    private dialog: MatDialog,
    private apiEmployeeService: ApiEmployeeService
  ) {}
  ngOnInit(): void {
    this.getAllEmployees();
  }

  //#region Employee API
  getAllEmployees() {
    this.apiEmployeeService.getList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert(
          err + 'Error while fetching Employees:/Empleado/ReadAll records!'
        );
      },
    });
  }
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
  deleteEmployee(id: number) {
    
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Este empleado se eliminara definitivamente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiEmployeeService.delete('p_empleado_oid', id).subscribe({
          next: (res) => {
            Swal.fire('Eliminado!', 'Empleado se ha eliminado correctamente', 'success');
            this.getAllEmployees();
          },
          error: (err) => {
            alert(err + 'Error al momento de eliminar employee');
          },
        });
        
      }
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
