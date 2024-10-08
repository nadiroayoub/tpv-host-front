import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadosComponent } from './empleados/empleados.component';
import { NegociosComponent } from './negocios/negocios.component';
import { PanelDeControlComponent } from './panel-de-control/panel-de-control.component';
import { VentasComponent } from './ventas/ventas.component';
import { DefaultComponent } from '../layouts/default/default.component';
import { ProfileComponent } from './profile/profile.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { ClientesComponent } from './clientes/clientes.component';
import { PlatosMenusComponent } from './platos-menus/platos-menus.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
        path: '',
        component: PanelDeControlComponent,
      },
      {
        path: 'panelControl',
        component: PanelDeControlComponent,
      },
      {
        path: 'ventas',
        component: VentasComponent,
      },
      {
        path: 'empleados',
        component: EmpleadosComponent,
      },
      {
        path: 'proveedores',
        component: ProveedoresComponent,
      },
      {
        path: 'negocios',
        component: NegociosComponent,
      },
      {
        path: 'platosymenus',
        component: PlatosMenusComponent,
      },
      {
        path: 'clientes',
        component: ClientesComponent,
      },
      {
        path: 'perfil',
        component: ProfileComponent,
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModulesRoutingModule {}
