import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../../shared/shared.module';
import { VentasComponent } from '../../modules/ventas/ventas.component';
import { DashboardComponent } from '../../modules/dashboard/dashboard.component';
import { EmpleadosComponent } from '../../modules/empleados/empleados.component';
import { InventarioComponent } from '../../modules/inventario/inventario.component';
import {  MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    DefaultComponent,
    VentasComponent,
    DashboardComponent,
    EmpleadosComponent,
    InventarioComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    FlexLayoutModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
  ],
  exports: [DefaultComponent],
})
export class DefaultModule {}
