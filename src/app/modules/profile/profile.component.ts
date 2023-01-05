import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiDuenyoService } from '../../services/apiDuenyo/api-duenyo.service';
import { Usuario } from '../../auth/interfaces/interfaces';
import { AuthService } from '../../auth/services/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  duenyoForm!: FormGroup;
  usuario!: Usuario;
  hide = true;
  hideConfirmPassword = true;
  emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  nifNieRegex = /^[XYZ]?\d{5,8}[A-Z]$/;
  imageUploaded = '';
  profileImgUrl: any;

  constructor(
    private formBuilder: FormBuilder,
    private apiDuenyoService: ApiDuenyoService,
    private authService: AuthService,
    public sanitizer: DomSanitizer,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuario = this.authService.usuario;
    console.log(this.usuario.Foto);
    // this.profileImgUrl = 'data:image/png;base64,' + this.usuario.Foto;
    this.duenyoForm = this.formBuilder.group(
      {
        foto: [this.usuario.Foto, Validators.required],
        dni: [
          this.usuario.Dni,
          [Validators.required, Validators.pattern(this.nifNieRegex)],
        ],
        nombre: [this.usuario.Nombre, Validators.required],
        apellidos: [this.usuario.Apellidos, Validators.required],
        telefono: [this.usuario.Telefono],
        email: [
          this.usuario.Email,
          [Validators.required, Validators.pattern(this.emailRegex)],
        ],
        pass: [
          null,
          [
            (c: AbstractControl) => Validators.required(c),
            Validators.pattern(
              /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
            ),
          ],
        ],
        duplicatePass: [
          null,
          [
            (c: AbstractControl) => Validators.required(c),
            Validators.pattern(
              /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
            ),
          ],
        ],
      },
      {
        validators: this.MustMatch('pass', 'duplicatePass'),
      }
    );
    this.createProfileImage();
    this.duenyoForm.valueChanges.subscribe((selectedValue) => {
      console.log(this.duenyoForm.value);
    });
  }
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ MustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
  UpdateDuenyo() {
    const data = this.duenyoForm.value;
    this.apiDuenyoService
      .update('idDuenyo', this.authService.usuario.Id, data)
      .subscribe({
        next: (res) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: '¡Dueño editado!',
            showConfirmButton: false,
            timer: 3500,
          });
          this.apiDuenyoService
            .UpladImage(
              this.usuario.Id,
              this.imageUploaded,
              this.duenyoForm.get('pass')?.value
            )
            .subscribe((res) => {
              return res;
            });
          this.logout();
          this.duenyoForm.reset();
        },
        error: () => {
          alert('Error al momento de editar un Dueño');
        },
      });
  }
  onSelectFile(e: any, usuario: Usuario): any {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      this.imageUploaded = e.target.files[0];
      reader.onload = (event: any) => {
        this.duenyoForm.controls['foto'].setValue(' ');
        this.profileImgUrl.url = event.target.result;
      };
    }
  }
  createProfileImage() {
    const imageBlob = this.loadingImage(
      this.authService.imageByte != null
        ? this.authService.imageByte.toString()
        : ''
    );
    var fileName = this.usuario.Foto.split('/').pop()!;
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
    console.log(finalFileHandle);
    this.profileImgUrl = finalFileHandle;
  }
  loadingImage(imageType: string) {
    const byteString = window.atob(
      this.authService.imageByte != null
        ? this.authService.imageByte.toString()
        : ''
    );
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: imageType });
    return blob;
  }
  logout() {
    this.router.navigateByUrl('/auth');
    this.authService.logout();
  }
}
