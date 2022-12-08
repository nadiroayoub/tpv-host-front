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
  constructor(
    private formBuilder: FormBuilder,
    private apiDuenyoService: ApiDuenyoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.usuario = this.authService.usuario;
    this.duenyoForm = this.formBuilder.group(
      {
        foto: [this.usuario.Foto, Validators.required],
        dni: [
          this.usuario.Dni,
          [Validators.required, Validators.pattern(this.nifNieRegex)],
        ],
        nombre: [this.usuario.Nombre, Validators.required],
        apellidos: [this.usuario.Apellido, Validators.required],
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
          console.log('Dueño modificado');
          this.duenyoForm.reset();
        },
        error: () => {
          alert('Error al momento de editar un Dueño');
        },
      });
  }
  UploadProfilePicture(event: any, usuario: Usuario): any {
    this.apiDuenyoService
      .UpladImage(this.usuario.Id, event.target.files[0])
      .subscribe((res) => {
        return res;
      });
  }
}
