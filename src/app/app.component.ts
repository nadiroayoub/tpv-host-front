<<<<<<< HEAD
import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
=======
import { Component, OnInit } from '@angular/core';
>>>>>>> main

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
<<<<<<< HEAD
export class AppComponent {
  constructor(){}
=======
export class AppComponent implements OnInit {
  ngOnInit(): void {}
  title = 'adminDashboard';
>>>>>>> main
}
