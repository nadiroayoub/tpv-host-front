import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginFormulario: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    //  Validators.minLength(6)
    password: ['', [Validators.required]],
  });
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}
  login() {
    const { email, password } = this.loginFormulario.value;
    this.authService.login(email, password).subscribe((token) => {
      if (typeof token !== 'object') {
        sessionStorage.setItem('token', token);
        this.router.navigateByUrl('/dashboard');
      } else {
        Swal.fire({
          icon: 'error',
          heightAuto: false,
          title:
            'El correo electronico o la contraseña no son correctos. Inténtelo de nuevo ',
        });
      }
    });
  }
}
