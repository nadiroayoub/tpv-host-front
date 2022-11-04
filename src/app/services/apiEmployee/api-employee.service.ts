import { Injectable } from '@angular/core';
import { ApiService } from '../apiService/api.service';
import { Empleado } from '../../modules/empleados/empleados.component';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiEmployeeService extends ApiService<Empleado> {
  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
  }
  getResourceUrl(): string {
    return 'Empleado';
  }
}
