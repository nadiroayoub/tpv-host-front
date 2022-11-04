import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DialogEmpleadoComponent } from '../dialog-empleado/dialog-empleado.component';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ApiEmployeeService } from 'src/app/services/apiEmployee/api-employee.service';

//#region Interfaces
export interface Empresa {
  Nombre: string;
  Direccion: string;
}
//#endregion

@Component({
  selector: 'app-negocios',
  templateUrl: './negocios.component.html',
  styleUrls: ['./negocios.component.scss'],
})
export class NegociosComponent {
  constructor() {}
}
