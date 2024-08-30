import { Component, OnInit } from '@angular/core';
import { ApiMenuService } from '../../services/apiMenu/api-menu.service';
import { ApiPlatoService } from '../../services/apiPlato/api-plato.service';

@Component({
  selector: 'app-platos-menus',
  templateUrl: './platos-menus.component.html',
  styleUrls: ['./platos-menus.component.scss'],
})
export class PlatosMenusComponent implements OnInit {
  constructor(
    private apiMenuService: ApiMenuService,
    private apiPlatoService: ApiPlatoService
  ) {}

  ngOnInit(): void {}
}
