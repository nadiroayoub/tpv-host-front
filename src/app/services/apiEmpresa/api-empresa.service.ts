import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../apiService/api.service';
import { Empresa } from 'src/app/shared/models/Empresa';

@Injectable({
  providedIn: 'root',
})
export class ApiEmpresaService extends ApiService<Empresa> {
  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
  }
  getResourceUrl(): string {
    return 'Empresa';
  }
}
