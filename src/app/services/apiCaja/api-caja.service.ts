import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Caja } from 'src/app/shared/models/Caja';
import { ApiService } from '../apiService/api.service';

@Injectable({
  providedIn: 'root',
})
export class ApiCajaService extends ApiService<Caja> {
  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
  }
  getResourceUrl(): string {
    return 'Caja';
  }
  dameCajaPorNegocio(negocioId: string): Observable<Caja[]> {
    var endpoint = `${this.APIUrl}/DameCajaPorNegocio?p_negocio=${negocioId}`;
    return this.httpClient
      .get<Caja[]>(`${endpoint}`)
      .pipe(catchError(this.handleError));
  }
}
