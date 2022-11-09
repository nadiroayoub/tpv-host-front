import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadosComponent } from './empleados/empleados.component';
import { InventarioComponent } from './inventario/inventario.component';
import { NegociosComponent } from './negocios/negocios.component';
import { PanelDeControlComponent } from './panel-de-control/panel-de-control.component';
import { VentasComponent } from './ventas/ventas.component';
import { DefaultComponent } from '../layouts/default/default.component';
import { ProfileComponent } from './profile/profile.component';

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
        path: 'inventario',
        component: InventarioComponent,
      },
      {
        path: 'negocios',
        component: NegociosComponent,
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
