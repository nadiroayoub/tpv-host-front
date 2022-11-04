import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})
export class DefaultComponent implements OnInit {
  sideBarOpen: boolean = true;
  get usuario() {
    return this.authService.usuario;
  }
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    console.log(this.usuario);
  }
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  logout() {
    this.router.navigateByUrl('/auth');
  }
}
