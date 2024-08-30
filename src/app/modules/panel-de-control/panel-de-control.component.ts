import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Empleado } from 'src/app/shared/models/Empleado';
import { ApiEmployeeService } from '../../services/apiEmployee/api-employee.service';

@Component({
  selector: 'app-panel-de-control',
  templateUrl: './panel-de-control.component.html',
  styleUrls: ['./panel-de-control.component.scss'],
})
export class PanelDeControlComponent implements OnInit {
  empleadosList!: Empleado[];
  empleadoFotos: any[] = [];
  constructor(
    private apiEmployeeService: ApiEmployeeService,
    private authService: AuthService,
    public sanitizer: DomSanitizer
  ) {}
  ngOnInit(): void {
    this.getAllEmployees();
  }
  getAllEmployees() {
    this.apiEmployeeService.getList().subscribe({
      next: (res) => {
        res.forEach((empleado: any) => {
          this.empleadoFotos.push(this.convertUrl(empleado.Foto));
        });
        this.empleadosList = res;
      },
      error: (err) => {
        alert('Error while fetching Employees:/Empleado/ReadAll records!');
      },
    });
  }

  convertUrl(absoluteUtlFoto: string) {
    const imageBlob = this.loadingImage(
      this.authService.imageByte != null
        ? this.authService.imageByte.toString()
        : ''
    );
    var fileName = absoluteUtlFoto.split('/').pop()!;
    const imageFile = new File(
      [imageBlob],
      fileName.substring(0, fileName.lastIndexOf('.'))
    );
    const finalFileHandle = {
      file: imageFile,
      url: this.sanitizer.bypassSecurityTrustUrl(
        window.URL.createObjectURL(imageFile)
      ),
    };
    if (fileName != '') {
      var relativeImgUrl = URL.createObjectURL(imageBlob);
      // relativeImgUrl = finalFileHandle.url;
    } else {
      relativeImgUrl = '';
    }
    return relativeImgUrl;
  }

  // load image
  loadingImage(imageType: string) {
    const byteString = window.atob(
      this.authService.imageByte != null
        ? this.authService.imageByte.toString()
        : ''
    );
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: imageType });
    return blob;
  }
}
