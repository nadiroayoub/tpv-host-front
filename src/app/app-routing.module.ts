import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { EmpleadosComponent } from './modules/empleados/empleados.component';
import { VentasComponent } from './modules/ventas/ventas.component';
import { InventarioComponent } from './modules/inventario/inventario.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
