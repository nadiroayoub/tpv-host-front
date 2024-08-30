import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mesa } from 'src/app/shared/models/Mesa';
import { ApiService } from '../apiService/api.service';

@Injectable({
  providedIn: 'root',
})
export class ApiMesaService extends ApiService<Mesa> {
  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
  }
  getResourceUrl(): string {
    return 'Mesa';
  }
}
