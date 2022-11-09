import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../apiService/api.service';
import { Duenyo } from '../../shared/models/Duenyo';
import { environment } from 'src/environments/environment';
import { catchError, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ApiDuenyoService extends ApiService<Duenyo> {
  private readonly apiUrl = environment.apiUrl + `/${this.getResourceUrl()}`;

  getResourceUrl(): string {
    return 'DuenyoRegistrado';
  }
  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
  }
  UpladImage(id: string) {
    var endpoint = `${this.apiUrl}/UploadImage`;
    const strs = `${endpoint}?p_oid=${id}`;
    return this.httpClient.post(`${endpoint}?p_oid=${id}`, '').pipe(
      catchError((err) => {
        console.log('upload erro', err);
        return err;
      })
    );
  }
}
