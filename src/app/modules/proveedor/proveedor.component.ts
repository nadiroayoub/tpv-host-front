import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Proveedor } from '../../shared/models/Proveedor';
import { ApiProveedorService } from '../../services/ApiProveedor/api-proveedor.service';
import { DialogProveedorComponent } from '../dialog-proveedor/dialog-proveedor.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.scss'],
})
export class ProveedorComponent implements OnInit {
  displayedColumns: string[] = ['Nombre', 'Telefono', 'Email', 'Accion'];
  columns = [
    {
      columnDef: 'Nombre',
      header: 'Nombre',
      cell: (element: Proveedor) => `${element.Nombre}`,
    },
    {
      columnDef: 'Telefono',
      header: 'Telefono',
      cell: (element: Proveedor) => `${element.Telefono}`,
    },
    {
      columnDef: 'Email',
      header: 'Email',
      cell: (element: Proveedor) => `${element.Email}`,
    },
  ];

  dataSource: MatTableDataSource<Proveedor> = new MatTableDataSource<Proveedor>(
    []
  );
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private dialog: MatDialog,
    private apiProveedorService: ApiProveedorService
  ) {}

  ngOnInit(): void {
    this.getAllProveedors();
  }

  //#region Empresa API
  getAllProveedors() {
    this.apiProveedorService.getList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert('Error while fetching /Proveedor/ReadAll records!');
      },
    });
  }
  editProveedor(row: any) {
    this.dialog
      .open(DialogProveedorComponent, {
        width: '30%',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'Editar') {
          this.getAllProveedors();
        }
      });
  }
  deleteEmployee(id: number, nombre: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Proveedor se eliminará definitivamente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#57ae51',
      cancelButtonColor: '#f44336',
      confirmButtonText: '¡Sí, bórralo!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiProveedorService.delete('p_proveedor_oid', id).subscribe({
          next: (res) => {
            Swal.fire(
              'Eliminado!',
              `El proveedor "${nombre}" se ha eliminado correctamente`,
              'success'
            );
            this.getAllProveedors();
          },
          error: (err) => {
            alert(err + 'Error al momento de eliminar proveedor');
          },
        });
      }
    });
  }
  //#endregion

  //#region Proveedor DIALOG
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toUpperCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openDialog(): void {
    this.dialog
      .open(DialogProveedorComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'Guardar') {
          this.getAllProveedors();
        }
      });
  }
  //#endregion
}
