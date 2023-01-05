import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Cobro } from 'src/app/shared/models/Cobro';
import { ApiService } from '../apiService/api.service';

@Injectable({
  providedIn: 'root',
})
export class ApiCobroService extends ApiService<Cobro> {
  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
  }
  getResourceUrl(): string {
    return 'Cobro';
  }
  DameCobrosPorCiudad(ciudades: string[]) {
    var endpoint = `${this.APIUrl}/DameCobrosPorCiudades`;
    return this.httpClient
      .post<number>(`${endpoint}`, ciudades)
      .pipe(catchError(this.handleError));
  }
}
