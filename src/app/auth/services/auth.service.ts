import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse, Usuario } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string = environment.apiUrl;
  private _usuario!: Usuario;

  get usuario() {
    return { ...this._usuario };
  }

  constructor(private http: HttpClient) {}

  signup(formValue: any) {
    const url = `${this.apiUrl}/DuenyoAnonimo/nuevo`;
    const body = formValue;

    return this.http.post<any>(url, body).pipe(
      tap((resp) => resp),
      map((resp) => resp),
      catchError((err) => of(err))
    );
  }

  login(Email: string, Pass: string) {
    const url = `${this.apiUrl}/DuenyoAnonimo/Login`;
    const body = { Email, Pass };

    return this.http.post<string>(url, body).pipe(
      tap((resp) => {
        if (resp != '') {
          sessionStorage.setItem('token', resp);
        }
      }),
      map((resp) => resp),
      catchError((err) => of(err))
    );
  }

  validarToken(): Observable<boolean> {
    const url = `${this.apiUrl}/DuenyoRegistrado`;
    const headers = new HttpHeaders().set(
      'Authorization',
      sessionStorage.getItem('token') || ''
    );
    if (headers.get('Authorization') == '') {
      return of(false);
    }
    const x = headers.get('Authorization');
    return this.http.get<AuthResponse>(url, { headers }).pipe(
      map((resp) => {
        sessionStorage.setItem('token', sessionStorage.getItem('token')!);
        this._usuario = {
          Id: resp.Id!,
          Nombre: resp.Nombre!,
          Apellido: resp.Apellido!,
          Telefono: resp.Telefono!,
          Email: resp.Email!,
          Dni: resp.Dni!,
          Pass: resp.Pass!,
          Foto: resp.Foto!,
        };
        return true;
      }),
      catchError((err) => of(false))
    );
  }

  logout() {
    sessionStorage.removeItem('token');
  }
}
