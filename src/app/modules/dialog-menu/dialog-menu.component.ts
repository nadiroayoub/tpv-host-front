import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ApiDuenyoService } from 'src/app/services/apiDuenyo/api-duenyo.service';
import { ApiMenuService } from 'src/app/services/apiMenu/api-menu.service';
import { ApiNegocioService } from 'src/app/services/apiNegocio/api-negocio.service';
import { Duenyo } from 'src/app/shared/models/Duenyo';
import { Menu } from 'src/app/shared/models/Menu';
import { Negocio } from 'src/app/shared/models/Negocio';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-menu',
  templateUrl: './dialog-menu.component.html',
  styleUrls: ['./dialog-menu.component.scss'],
})
export class DialogMenuComponent implements OnInit {
  menuForm!: FormGroup;
  btnAccion: string = 'Guardar';
  menus!: Menu[];
  negocios!: Negocio[];
  duenyos!: Duenyo[];
  emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  nifNieRegex = /^[XYZ]?\d{5,8}[A-Z]$/;
  hide = true;
  hideConfirmPassword = true;
  titleAccion: string = 'Agregar';
  imageUploaded = '';
  menuImgUrl: any = null;
  selectedFile: any = '';
  private _imageByte: string | object = '';

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private apiNegocioService: ApiNegocioService,
    private apiDuenyoService: ApiDuenyoService,
    private apiMenuService: ApiMenuService,
    private authService: AuthService,
    private dialogRef: MatDialogRef<DialogMenuComponent>,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.menuForm = this.formBuilder.group({
      id: [''],
      nombre: [''],
      precio: [''],
      foto: [''],
      Negocio_oid: ['', Validators.required],
      // Duenyo_oid: [''],
    });
    if (this.editData) {
      this.titleAccion = this.btnAccion = 'Editar';
      this.menuForm.controls['id'].setValue(this.editData.Id);
      this.menuForm.controls['nombre'].setValue(this.editData.Nombre);
      this.menuForm.controls['precio'].setValue(this.editData.Precio);
      this.menuForm.controls['foto'].setValue(this.editData.Foto);
      this.menuForm.controls['Negocio_oid'].setValue(
        this.editData.NegocioMenu.Id
      );
      // this.menuForm.controls['Duenyo_oid'].setValue(this.editData.Duenyo.Id);
    }
    this.getNegocios();
  }

  //#region Negocio API
  getNegocios() {
    this.apiNegocioService.getList().subscribe({
      next: (res) => {
        this.negocios = res;
      },
      error: (err) => {
        alert('Error while fetching Negocio:/Negocio/ReadAll records!');
      },
    });
  }
  //#endregion

  //#region Menu API
  addMenu(data: any) {
    // this.menuForm.addControl('Foto', new FormControl('', Validators.required));
    // this.menuForm.patchValue({
    //   Foto: 'string',
    // });
    if (!this.editData) {
      if (this.menuForm.valid) {
        this.apiMenuService.add(this.menuForm.value).subscribe({
          next: (res: any) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: '¡Menu creada!',
              showConfirmButton: false,
              timer: 3500,
              heightAuto: false,
            });
            this.apiMenuService
              .UploadImage(
                res.Id,
                this.imageUploaded,
                this.menuForm.get('pass')?.value
              )
              .subscribe((res) => {
                return res;
              });
            this.menuForm.reset();
            this.dialogRef.close('Guardar');
          },
          error: (err: any) => {
            Swal.fire({
              icon: 'error',
              heightAuto: false,
              title: 'Error a agregar una menu',
            });
          },
        });
      }
    } else {
      this.updateMenu(this.menuForm.value.id, this.menuForm.value);
    }
  }
  updateMenu(id: string, data: any) {
    this.apiMenuService.update('idMenu', id, data).subscribe({
      next: (res: any) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Menu editado!',
          showConfirmButton: false,
          timer: 3500,
          heightAuto: false,
        });
        this.apiMenuService
          .UploadImage(id, this.imageUploaded, this.menuForm.get('pass')?.value)
          .subscribe((res) => {
            return res;
          });
        this.menuForm.reset();
        this.dialogRef.close('Editar');
      },
      error: () => {
        alert('Error al momento de editar un Menu');
      },
    });
  }
  //#endregion

  //#region page events
  onSelectFile(e: any): any {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      this.imageUploaded = e.target.files[0];
      reader.onload = (event: any) => {
        this.menuForm.controls['foto'].setValue(' ');
        // url of file , still have to add file
        this.menuImgUrl = event.target.result;

        this.selectedFile = e.target.files[0] ?? null;
      };
    }
  }
  //#endregion

  //#region loading menu images
  // createMenuImage(menu: Menu) {
  //   var filename = menu.Foto.split('/').pop()!;
  //   var imageByte: string | object = '';
  //   this.apiMenuService.getImage(menu.Id).subscribe((res) => {
  //     imageByte = res;
  //   });
  //   const imageBlob = this.loadingImage(
  //     imageByte != null ? imageByte.toString() : ''
  //   );
  //   var fileName = menu.Foto.split('/').pop()!;
  //   const imageFile = new File(
  //     [imageBlob],
  //     fileName.substring(0, fileName.lastIndexOf('.'))
  //   );
  //   const finalFileHandle = {
  //     file: imageFile,
  //     url: this.sanitizer.bypassSecurityTrustUrl(
  //       window.URL.createObjectURL(imageFile)
  //     ),
  //   };
  //   this.menuImgUrl = finalFileHandle;
  // }
  // loadingImage(imageType: string) {
  //   const byteString = window.atob(
  //     this.authService.imageByte != null
  //       ? this.authService.imageByte.toString()
  //       : ''
  //   );
  //   const arrayBuffer = new ArrayBuffer(byteString.length);
  //   const int8Array = new Uint8Array(arrayBuffer);
  //   for (let i = 0; i < byteString.length; i++) {
  //     int8Array[i] = byteString.charCodeAt(i);
  //   }
  //   const blob = new Blob([int8Array], { type: imageType });
  //   return blob;
  // }
  //#endregion
}
