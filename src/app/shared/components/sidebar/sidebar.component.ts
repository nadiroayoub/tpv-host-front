import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  navigationElements = [
    'Panel de control',
    'ventas',
    'proveedores',
    'empleados',
  ];
  constructor() {}

  ngOnInit(): void {}
}
