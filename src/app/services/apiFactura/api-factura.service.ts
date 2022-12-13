import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Factura } from 'src/app/shared/models/Factura';
import { ApiService } from '../apiService/api.service';

@Injectable({
  providedIn: 'root',
})
export class ApiFacturaService extends ApiService<Factura> {
  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
  }
  getResourceUrl(): string {
    return 'Factura';
  }
  getAllFacturaOfCliente(id: string | number): Observable<Factura[]> {
    var endpoint = `${this.APIUrl}/GetAllFacturaByCliente?idCliente=${id}`;
    return this.httpClient
      .get<Factura[]>(`${endpoint}`)
      .pipe(catchError(this.handleError));
  }
}
