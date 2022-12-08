import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../apiService/api.service';
import { Duenyo } from '../../shared/models/Duenyo';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs';

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
  UpladImage(id: string, fileToUpload: any) {
    // headers
    var header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `${sessionStorage.getItem('token')!}`
      ),
    };

    // fin headers

    var endpoint = `${this.apiUrl}/UploadImage`;
    const strs = `${endpoint}?p_oid=${id}`;
    let formData: FormData = new FormData();
    formData.append('file', fileToUpload);

    return this.httpClient
      .post(`${endpoint}?p_oid=${id}`, formData, header)
      .pipe(
        catchError((err) => {
          console.log('upload erro', err);
          return err;
        })
      );
  }
}
