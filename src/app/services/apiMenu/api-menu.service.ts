import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Menu } from 'src/app/shared/models/Menu';
import { ApiService } from '../apiService/api.service';

@Injectable({
  providedIn: 'root',
})
export class ApiMenuService extends ApiService<Menu> {
  private _imageByte: string | object = '';

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
  }
  getResourceUrl(): string {
    return 'Menu';
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
    var endpoint = `${this.APIUrl}/UploadImage`;
    const strs = `${endpoint}?p_oid=${id}`;
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
  getImage(id: string | number): Observable<string | object> {
    var endpoint = `${this.APIUrl}/GetImage`;
    return this.httpClient
      .get(`${endpoint}?id=${id}`)
      .pipe(catchError(this.handleError));
  }
}
