import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  porcentaje: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    name: 'Hydrogen',
    weight: 1.0079,
    symbol: 'H',
    porcentaje: '',
  },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', porcentaje: '' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', porcentaje: '' },
  {
    position: 4,
    name: 'Beryllium',
    weight: 9.0122,
    symbol: 'Be',
    porcentaje: '',
  },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B', porcentaje: '' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', porcentaje: '' },
  {
    position: 7,
    name: 'Nitrogen',
    weight: 14.0067,
    symbol: 'N',
    porcentaje: '',
  },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', porcentaje: '' },
  {
    position: 9,
    name: 'Fluorine',
    weight: 18.9984,
    symbol: 'F',
    porcentaje: '',
  },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', porcentaje: '' },
];

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss'],
})
export class InventarioComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'name',
    'weight',
    'symbol',
    'porcentaje',
  ];
  dataSource = ELEMENT_DATA;
  constructor() {}

  ngOnInit(): void {}
}
