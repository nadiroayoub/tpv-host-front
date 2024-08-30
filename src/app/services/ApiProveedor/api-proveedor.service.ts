import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Proveedor } from '../../shared/models/Proveedor';
import { ApiService } from '../apiService/api.service';

@Injectable({
  providedIn: 'root',
})
export class ApiProveedorService extends ApiService<Proveedor> {
  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
  }
  getResourceUrl(): string {
    return 'Proveedor';
  }
  // getAllNegocioByEmpresa(id: string | number): Observable<Proveedor[]> {
  //   var endpoint = `${this.APIUrl}/GetAllNegocioByEmpresa?idEmpresa=${id}`;
  //   return this.httpClient
  //     .get<Proveedor[]>(`${endpoint}`)
  //     .pipe(catchError(this.handleError));
  // }
}
