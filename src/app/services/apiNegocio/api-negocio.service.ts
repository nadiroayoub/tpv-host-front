import { Injectable } from '@angular/core';
import { ApiService } from '../apiService/api.service';
import { HttpClient } from '@angular/common/http';
import { Negocio } from 'src/app/shared/models/Negocio';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiNegocioService extends ApiService<Negocio> {
  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
  }
  getResourceUrl(): string {
    return 'Negocio';
  }
  getAllNegocioByEmpresa(id: string | number): Observable<Negocio[]> {
    var endpoint = `${this.APIUrl}/GetAllNegocioByEmpresa?idEmpresa=${id}`;
    return this.httpClient
      .get<Negocio[]>(`${endpoint}`)
      .pipe(catchError(this.handleError));
  }
  DameCobrosPorCiudad(ciudad: string) {
    var endpoint = `${this.APIUrl}/DameCobrosPorCiudad?p_ciudad=${ciudad}`;
    return this.httpClient
      .get<number>(`${endpoint}`)
      .pipe(catchError(this.handleError));
  }
}
