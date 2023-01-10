import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { LineaComanda } from 'src/app/shared/models/LineaComanda';
import { ApiService } from '../apiService/api.service';

@Injectable({
  providedIn: 'root',
})
export class ApiLineaComandaService extends ApiService<LineaComanda> {
  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
  }
  getResourceUrl(): string {
    return 'LineaComanda';
  }
  getAllLineaComandaOfPlato(platoId: number): Observable<LineaComanda[]> {
    var endpoint = `${this.APIUrl}/GetAllLineaComandaOfPlato?idPlato=${platoId}`;
    return this.httpClient
      .get<LineaComanda[]>(`${endpoint}`)
      .pipe(catchError(this.handleError));
  }
  getAllLineaComandaOfMenu(menuId: number): Observable<LineaComanda[]> {
    var endpoint = `${this.APIUrl}/GetAllLineaComandaOfMenu?idMenu=${menuId}`;
    return this.httpClient
      .get<LineaComanda[]>(`${endpoint}`)
      .pipe(catchError(this.handleError));
  }
}
