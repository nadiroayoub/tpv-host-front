import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../apiService/api.service';
import { Duenyo } from '../../shared/models/Duenyo';
import { environment } from 'src/environments/environment';
import { catchError, Observable } from 'rxjs';

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
  UploadImage(id: string, fileToUpload: any, password: string) {
    // headers
    var header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `${sessionStorage.getItem('token')!}`
      ),
    };

    // fin headers
    var endpoint = `${this.apiUrl}/UploadImage`;
    let formData: FormData = new FormData();
    formData.append('file', fileToUpload);

    return this.httpClient
      .post(`${endpoint}?p_oid=${id}&p_pass=${password}`, formData, header)
      .pipe(
        catchError((err) => {
          return err;
        })
      );
  }
  override update(idName: string, id: string | number, resource: Duenyo) {
    var endpoint = `${this.APIUrl}/Modificar`;
    var header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `${sessionStorage.getItem('token')!}`
      ),
    };
    return this.httpClient
      .put(`${endpoint}?${idName}=${id}`, resource, header)
      .pipe(catchError(this.handleError));
  }
  // imageName: string | number
  getImage(id: string | number): Observable<string | object> {
    var endpoint = `${this.APIUrl}/GetImage`;
    // &imageName=${imageName}
    return this.httpClient
      .get(`${endpoint}?id=${id}`)
      .pipe(catchError(this.handleError));
  }
}
