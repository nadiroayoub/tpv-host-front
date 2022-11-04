import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel-de-control',
  templateUrl: './panel-de-control.component.html',
  styleUrls: ['./panel-de-control.component.scss'],
})
export class PanelDeControlComponent implements OnInit {
  empleadosList = [
    {
      nombre: 'Marcos',
      ciudad: 'Valencia',
      foto: 'https://material.angular.io/assets/img/examples/shiba1.jpg',
    },
    {
      nombre: 'Alex',
      ciudad: 'Benidorm',
      foto: 'https://material.angular.io/assets/img/examples/shiba1.jpg',
    },
    {
      nombre: 'David',
      ciudad: 'Alicante',
      foto: 'https://material.angular.io/assets/img/examples/shiba1.jpg',
    },
    {
      nombre: 'Karim',
      ciudad: 'Elche',
      foto: 'https://material.angular.io/assets/img/examples/shiba1.jpg',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
