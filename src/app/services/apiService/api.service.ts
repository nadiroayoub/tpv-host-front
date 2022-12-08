import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export abstract class ApiService<T> {
  protected readonly APIUrl = environment.apiUrl + `/${this.getResourceUrl()}`;

  constructor(protected httpClient: HttpClient) {}

  abstract getResourceUrl(): string;

  getList(): Observable<T[]> {
    var endpoint = `${this.APIUrl}/ReadAll`;
    return this.httpClient
      .get<T[]>(`${endpoint}`)
      .pipe(catchError(this.handleError));
  }

  get(id: string | number): Observable<T> {
    var endpoint = `${this.APIUrl}`;
    return this.httpClient
      .get<T>(`${endpoint}/${id}`)
      .pipe(catchError(this.handleError));
  }

  add(resource: T): Observable<any> {
    var endpoint = `${this.APIUrl}/Nuevo`;
    return this.httpClient
      .post(`${endpoint}`, resource)
      .pipe(catchError(this.handleError));
  }

  delete(idName: string,id: string | number): Observable<any> {
    var endpoint = `${this.APIUrl}/Eliminar`;
    return this.httpClient
      .delete(`${endpoint}?${idName}=${id}`)
      .pipe(catchError(this.handleError));
  }

  update(idName: string, id: string | number, resource: T) {
    var endpoint = `${this.APIUrl}/Modificar`;
    return this.httpClient
      .put(`${endpoint}?${idName}=${id}`, resource)
      .pipe(catchError(this.handleError));
  }

  protected handleError(error: HttpErrorResponse) {
    // Handle the HTTP error here
    return throwError('Something wrong happened');
  }
}
