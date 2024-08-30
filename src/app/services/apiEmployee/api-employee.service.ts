import { Injectable } from '@angular/core';
import { ApiService } from '../apiService/api.service';
import { HttpClient } from '@angular/common/http';
import { Empleado } from 'src/app/shared/models/Empleado';

import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiEmployeeService extends ApiService<Empleado> {
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }
  getResourceUrl(): string {
    return 'Empleado';
  }
  getAllEmpleadoByNegocio(id: string | number): Observable<Empleado[]> {
    var endpoint = `${this.APIUrl}/GetAllEmpleadoByNegocio?idNegocio=${id}`;
    return this.httpClient.get<Empleado[]>(`${endpoint}`).pipe(catchError(this.handleError));
  }
}
