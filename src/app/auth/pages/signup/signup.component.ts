import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupFormulario!: FormGroup;
  emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  passRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/;
  hide = true;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.signupFormulario = this.fb.group(
      {
        Dni: [''],
        Nombre: ['', [Validators.required]],
        Apellido: ['', [Validators.required]],
        Telefono: [''],
        Pass: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
            ),
          ],
        ],
        Email: [
          null,
          [
            (c: AbstractControl) => Validators.required(c),
            Validators.pattern(this.emailRegex),
          ],
        ],
        DuplicatedEmail: [
          null,
          [
            (c: AbstractControl) => Validators.required(c),
            ,
            Validators.pattern(this.emailRegex),
          ],
        ],
        Foto: [''],
      },
      {
        validators: this.MustMatch('Email', 'DuplicatedEmail'),
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
  signup() {
    const {
      DNI,
      Nombre,
      Apellido,
      Telefono,
      Pass,
      Email,
      DuplicatedEmail,
      Foto,
    } = this.signupFormulario.value;
    this.authService.signup(this.signupFormulario.value).subscribe((res) => {
      if (res != null) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Usuario creado',
          showConfirmButton: false,
          timer: 3500,
        }).then(() => {
          this.router.navigateByUrl('/dashboard');
        });
      } else {
        Swal.fire({
          icon: 'error',
          heightAuto: false,
          title: 'Correo electronico o DNI ya existen',
        });
      }
    });
  }
}
