import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ApiDuenyoService } from 'src/app/services/apiDuenyo/api-duenyo.service';
import { ApiNegocioService } from 'src/app/services/apiNegocio/api-negocio.service';
import { ApiPlatoService } from 'src/app/services/apiPlato/api-plato.service';
import { Duenyo } from 'src/app/shared/models/Duenyo';
import { Menu } from 'src/app/shared/models/Menu';
import { Negocio } from 'src/app/shared/models/Negocio';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-plato',
  templateUrl: './dialog-plato.component.html',
  styleUrls: ['./dialog-plato.component.scss'],
})
export class DialogPlatoComponent implements OnInit {
  platoForm!: FormGroup;
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
  platoImgUrl: any = null;
  selectedFile: any = '';

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private apiNegocioService: ApiNegocioService,
    private apiDuenyoService: ApiDuenyoService,
    private apiPlatoService: ApiPlatoService,
    private authService: AuthService,
    private dialogRef: MatDialogRef<DialogPlatoComponent>
  ) {}

  ngOnInit(): void {
    this.platoForm = this.formBuilder.group({
      id: [''],
      nombre: [''],
      precio: [''],
      foto: [''],
      Negocio_oid: ['', Validators.required],
      // Duenyo_oid: [''],
    });
    if (this.editData) {
      this.titleAccion = this.btnAccion = 'Editar';
      this.platoForm.controls['id'].setValue(this.editData.Id);
      this.platoForm.controls['nombre'].setValue(this.editData.Nombre);
      this.platoForm.controls['precio'].setValue(this.editData.Precio);
      this.platoForm.controls['foto'].setValue(this.editData.Foto);
      this.platoForm.controls['Negocio_oid'].setValue(
        this.editData.NegocioPlato.Id
      );
      // this.platoForm.controls['Duenyo_oid'].setValue(this.editData.Duenyo.Id);
    }
    this.getNegocios();
    // this.createPlatoImage();
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

  //#region Plato API
  addPlato(data: any) {
    // this.platoForm.addControl('Foto', new FormControl('', Validators.required));
    // this.platoForm.patchValue({
    //   Foto: 'string',
    // });
    if (!this.editData) {
      if (this.platoForm.valid) {
        this.apiPlatoService.add(this.platoForm.value).subscribe({
          next: (res: any) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: '¡Plato creado!',
              showConfirmButton: false,
              timer: 3500,
              heightAuto: false,
            });
            this.apiPlatoService
              .UploadImage(
                res.Id,
                this.imageUploaded,
                this.platoForm.get('pass')?.value
              )
              .subscribe((res) => {
                return res;
              });
            this.platoForm.reset();
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
      this.updatePlato(this.platoForm.value.id, this.platoForm.value);
    }
  }
  updatePlato(id: string, data: any) {
    this.apiPlatoService.update('idPlato', id, data).subscribe({
      next: (res: any) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Plato editado!',
          showConfirmButton: false,
          timer: 3500,
          heightAuto: false,
        });
        this.apiPlatoService
          .UploadImage(
            id,
            this.imageUploaded,
            this.platoForm.get('pass')?.value
          )
          .subscribe((res) => {
            return res;
          });
        this.platoForm.reset();
        this.dialogRef.close('Editar');
      },
      error: () => {
        alert('Error al momento de editar un Plato');
      },
    });
  }

  getPlatos() {
    return this.apiPlatoService.getList();
  }
  //#endregion

  //#region page events
  onSelectFile(e: any): any {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      this.imageUploaded = e.target.files[0];
      reader.onload = (event: any) => {
        this.platoForm.controls['foto'].setValue(' ');
        // url of file , still have to add file
        this.platoImgUrl = event.target.result;

        this.selectedFile = e.target.files[0] ?? null;
      };
    }
  }
  // createPlatoImage() {
  //   const imageBlob = this.loadingImage(
  //     this.authService.imageByte != null
  //       ? this.authService.imageByte.toString()
  //       : ''
  //   );
  //   var fileName = this.plato.Foto.split('/').pop()!;
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
  //
  //   this.profileImgUrl = finalFileHandle;
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
