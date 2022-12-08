import { Injectable } from '@angular/core';
import { ApiService } from '../apiService/api.service';
import { HttpClient } from '@angular/common/http';
import { Negocio } from 'src/app/shared/models/Negocio';

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
}
