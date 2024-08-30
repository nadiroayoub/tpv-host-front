import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiNegocioService } from 'src/app/services/apiNegocio/api-negocio.service';
import { ApiPlatoService } from 'src/app/services/apiPlato/api-plato.service';
import { Plato } from 'src/app/shared/models/Plato';
import Swal from 'sweetalert2';
import { DialogPlatoComponent } from '../dialog-plato/dialog-plato.component';

@Component({
  selector: 'app-plato',
  templateUrl: './plato.component.html',
  styleUrls: ['./plato.component.scss'],
})
export class PlatoComponent implements OnInit {
  displayedColumns: string[] = [
    'Nombre',
    'Precio',
    'Foto',
    'Negocio',
    'Accion',
  ];
  columns = [
    {
      columnDef: 'Nombre',
      header: 'Nombre',
      cell: (element: Plato) => `${element.Nombre}`,
    },
    {
      columnDef: 'Precio',
      header: 'Precio',
      cell: (element: Plato) => `${element.Precio}`,
    },
    {
      columnDef: 'Foto',
      header: 'Foto',
      cell: (element: Plato) => `${element.Foto}`,
    },
  ];
  platoImgUrl: any = null;
  imageByte: string | object = '';
  dataSource: MatTableDataSource<Plato> = new MatTableDataSource<Plato>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private dialog: MatDialog,
    private apiPlatoService: ApiPlatoService,
    public sanitizer: DomSanitizer
  ) {}
  ngOnInit(): void {
    this.getAllPlatos();
  }

  //#region Plato API
  getAllPlatos() {
    this.apiPlatoService.getList().subscribe({
      next: (platos) => {
        platos.forEach((plato) => {
          this.createPlatoImage(plato);
        });
        this.dataSource = new MatTableDataSource(platos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert('Error while fetching /Plato/ReadAll records!');
      },
    });
  }
  editPlato(row: any) {
    this.dialog
      .open(DialogPlatoComponent, {
        width: '30%',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'Editar') {
          this.getAllPlatos();
        }
      });
  }
  deletePlato(id: number, nombre: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Plato se eliminará definitivamente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#57ae51',
      cancelButtonColor: '#f44336',
      confirmButtonText: '¡Sí, bórralo!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiPlatoService.delete('p_plato_oid', id).subscribe({
          next: (res) => {
            Swal.fire(
              'Eliminado!',
              `El plato "${nombre}" se ha eliminado correctamente`,
              'success'
            );
            this.getAllPlatos();
          },
          error: (err) => {
            alert(err + 'Error al momento de eliminar plato');
          },
        });
      }
    });
  }
  //#endregion

  //#region Plato DIALOG
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toUpperCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openDialog(): void {
    this.dialog
      .open(DialogPlatoComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'Guardar') {
          this.getAllPlatos();
        }
      });
  }
  //#endregion
  //#region loading menu images
  createPlatoImage(plato: Plato) {
    this.apiPlatoService.getImage(plato.Id).subscribe((res) => {
      this.imageByte = res;
      const imageBlob = this.loadingImage(
        this.imageByte != null ? this.imageByte.toString() : ''
      );
      var fileName = plato.Foto.split('/').pop()!;
      const imageFile = new File(
        [imageBlob],
        fileName.substring(0, fileName.lastIndexOf('.'))
      );
      const finalFileHandle = {
        file: imageFile,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(imageFile)
        ),
      };
      if (fileName != '') {
        this.platoImgUrl = finalFileHandle.url;
        plato.Foto = this.platoImgUrl;
      } else {
        this.platoImgUrl = '';
        plato.Foto = '';
      }
    });
  }
  loadingImage(imageType: string) {
    const byteString = window.atob(
      this.imageByte != null ? this.imageByte.toString() : ''
    );
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: imageType });
    return blob;
  }
  //#endregion
}
