import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { EmpleadosComponent } from './modules/empleados/empleados.component';
import { VentasComponent } from './modules/ventas/ventas.component';
import { InventarioComponent } from './modules/inventario/inventario.component';
import { NegociosComponent } from './modules/negocios/negocios.component';
import { PanelDeControlComponent } from './modules/panel-de-control/panel-de-control.component';
import { ValidarTokenGuard } from './guards/validar-token.guard';

const routes: Routes = [
  // {
  //   path: '',
  //   component: DefaultComponent,
  //   children: [
  //     {
  //       path: '',
  //       component: PanelDeControlComponent,
  //     },
  //     {
  //       path: 'panelControl',
  //       component: PanelDeControlComponent,
  //     },
  //     {
  //       path: 'ventas',
  //       component: VentasComponent,
  //     },
  //     {
  //       path: 'empleados',
  //       component: EmpleadosComponent,
  //     },
  //     {
  //       path: 'inventario',
  //       component: InventarioComponent,
  //     },
  //     {
  //       path: 'negocios',
  //       component: NegociosComponent,
  //     },
  //   ],
  // },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/modules.module').then((m) => m.ModulesModule),
    canActivate: [ValidarTokenGuard],
    canLoad: [ValidarTokenGuard],
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
