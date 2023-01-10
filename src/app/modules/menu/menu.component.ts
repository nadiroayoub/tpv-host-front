import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiMenuService } from 'src/app/services/apiMenu/api-menu.service';
import { ApiNegocioService } from 'src/app/services/apiNegocio/api-negocio.service';
import { Menu } from 'src/app/shared/models/Menu';
import Swal from 'sweetalert2';
import { DialogMenuComponent } from '../dialog-menu/dialog-menu.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
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
      cell: (element: Menu) => `${element.Nombre}`,
    },
    {
      columnDef: 'Precio',
      header: 'Precio',
      cell: (element: Menu) => `${element.Precio}`,
    },
    {
      columnDef: 'Foto',
      header: 'Foto',
      cell: (element: Menu) => `${element.Foto}`,
    },
  ];
  menuImgUrl: any = null;
  imageByte: string | object = '';
  dataSource: MatTableDataSource<Menu> = new MatTableDataSource<Menu>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private dialog: MatDialog,
    private apiMenuService: ApiMenuService,
    private apiNegocioService: ApiNegocioService,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getAllMenus();
  }

  //#region Menu API
  getAllMenus() {
    this.apiMenuService.getList().subscribe({
      next: (menus) => {
        menus.forEach((menu) => {
          this.createMenuImage(menu);
        });
        this.dataSource = new MatTableDataSource(menus);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert('Error while fetching /Menu/ReadAll records!');
      },
    });
  }
  editMenu(row: any) {
    this.dialog
      .open(DialogMenuComponent, {
        width: '30%',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'Editar') {
          this.getAllMenus();
        }
      });
  }
  deleteMenu(id: number, nombre: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Menu se eliminará definitivamente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#57ae51',
      cancelButtonColor: '#f44336',
      confirmButtonText: '¡Sí, bórralo!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiMenuService.delete('p_menu_oid', id).subscribe({
          next: (res) => {
            Swal.fire(
              'Eliminado!',
              `El menu "${nombre}" se ha eliminado correctamente`,
              'success'
            );
            this.getAllMenus();
          },
          error: (err) => {
            alert(err + 'Error al momento de eliminar menu');
          },
        });
      }
    });
  }
  //#endregion

  //#region Menu DIALOG
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toUpperCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openDialog(): void {
    this.dialog
      .open(DialogMenuComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'Guardar') {
          this.getAllMenus();
        }
      });
  }
  //#endregion

  //#region loading menu images
  createMenuImage(menu: Menu) {
    this.apiMenuService.getImage(menu.Id).subscribe((res) => {
      this.imageByte = res;
      const imageBlob = this.loadingImage(
        this.imageByte != null ? this.imageByte.toString() : ''
      );
      var fileName = menu.Foto.split('/').pop()!;
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
        this.menuImgUrl = finalFileHandle.url;
        menu.Foto = this.menuImgUrl;
      } else {
        this.menuImgUrl = '';
        menu.Foto = '';
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
