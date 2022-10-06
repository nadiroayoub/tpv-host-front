import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VentasComponent } from './ventas/ventas.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    VentasComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports:[VentasComponent]
})
export class ModulesModule { }
