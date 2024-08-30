import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Pedido } from 'src/app/shared/models/Pedido';
import { ApiService } from '../apiService/api.service';

@Injectable({
  providedIn: 'root',
})
export class ApiPedidoService extends ApiService<Pedido> {
  getResourceUrl(): string {
    return 'Pedido';
  }

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
  }

  dameComandasPorFecha(): Observable<number> {
    var endpoint = `${this.APIUrl}/DameComandasPorFecha`;
    var fakeResources;
    return this.httpClient
      .post<number>(`${endpoint}`, fakeResources)
      .pipe(catchError(this.handleError));
  }
}
