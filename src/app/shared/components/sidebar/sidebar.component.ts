import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
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
    'clientes'
  ];
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.usuario = this.authService.usuario;
  }
}
