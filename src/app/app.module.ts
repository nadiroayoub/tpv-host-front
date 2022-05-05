import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './modules/home/home.component';
import { Error404Component } from './core/modules/404/error404/error404.component';
import { Error500Component } from './core/modules/error500/error500.component';
import { InputComponent } from './core/modules/forms/components/input/input.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Error404Component,
    Error500Component,
    InputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
