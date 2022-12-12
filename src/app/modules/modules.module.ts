import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VentasComponent } from './ventas/ventas.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EmpleadosComponent } from './empleados/empleados.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DialogEmpleadoComponent } from './dialog-empleado/dialog-empleado.component';
import {
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiEmployeeService } from '../services/apiEmployee/api-employee.service';
import { NegociosComponent } from './negocios/negocios.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { LayoutModule } from '@angular/cdk/layout';
import { PanelDeControlComponent } from './panel-de-control/panel-de-control.component';
import { NegocioComponent } from './negocio/negocio.component';
import { DialogNegocioComponent } from './dialog-negocio/dialog-negocio.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { DialogEmpresaComponent } from './dialog-empresa/dialog-empresa.component';
import { ModulesRoutingModule } from './modules-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { CajaComponent } from './caja/caja.component';
import { DialogCajaComponent } from './dialog-caja/dialog-caja.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { DialogProveedorComponent } from './dialog-proveedor/dialog-proveedor.component';
import { ClientesComponent } from './clientes/clientes.component';
import { FacturaComponent } from './factura/factura.component';
import { ClienteComponent } from './cliente/cliente.component';
import { DialogFacturaComponent } from './dialog-factura/dialog-factura.component';
import { DialogClienteComponent } from './dialog-cliente/dialog-cliente.component';

@NgModule({
  declarations: [
    VentasComponent,
    VentasComponent,
    EmpleadosComponent,
    DialogEmpleadoComponent,
    NegociosComponent,
    PanelDeControlComponent,
    NegocioComponent,
    DialogNegocioComponent,
    EmpresaComponent,
    DialogEmpresaComponent,
    ProfileComponent,
    CajaComponent,
    DialogCajaComponent,
    ProveedoresComponent,
    ProveedorComponent,
    DialogProveedorComponent,
    ClientesComponent,
    FacturaComponent,
    ClienteComponent,
    DialogFacturaComponent,
    DialogClienteComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    MatIconModule,
    MatPaginatorModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatDividerModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatMenuModule,
    MatExpansionModule,
    ReactiveFormsModule,
    FormsModule,
    MatGridListModule,
    LayoutModule,
    ModulesRoutingModule,
  ],
  exports: [
    VentasComponent,
    VentasComponent,
    EmpleadosComponent,
    NegociosComponent,
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    ApiEmployeeService,
  ],
})
export class ModulesModule {}
