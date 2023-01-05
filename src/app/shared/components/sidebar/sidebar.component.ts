import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Usuario } from '../../../auth/interfaces/interfaces';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  usuario!: Usuario;
  navigationElements = [
    'Panel de control',
    'ventas',
    'proveedores',
    'empleados',
    'negocios',
    'clientes',
  ];
  profileImgUrl: any;

  constructor(
    private authService: AuthService,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.usuario = this.authService.usuario;
    setTimeout(() => {
      this.createProfileImage();
    }, 500);
  }
  createProfileImage() {
    const imageBlob = this.loadingImage(
      this.authService.imageByte != null
        ? this.authService.imageByte.toString()
        : ''
    );
    var fileName = this.usuario.Foto.split('/').pop()!;
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
    this.profileImgUrl = finalFileHandle;
  }
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
