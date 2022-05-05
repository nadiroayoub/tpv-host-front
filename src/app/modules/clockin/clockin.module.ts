import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClockinRoutingModule } from './clockin-routing.module';
import { ClockinComponent } from './clockin.component';


@NgModule({
  declarations: [
    ClockinComponent
  ],
  imports: [
    CommonModule,
    ClockinRoutingModule
  ]
})
export class ClockinModule { }
