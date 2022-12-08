import { Component, OnInit } from '@angular/core';
import { Empleado } from 'src/app/shared/models/Empleado';
import { ApiEmployeeService } from '../../services/apiEmployee/api-employee.service';

@Component({
  selector: 'app-panel-de-control',
  templateUrl: './panel-de-control.component.html',
  styleUrls: ['./panel-de-control.component.scss'],
})

export class PanelDeControlComponent implements OnInit {
  empleadosList!: Empleado[];
  constructor(private apiEmployeeService: ApiEmployeeService) {}
  ngOnInit(): void {
    this.getAllEmployees();
  }
  getAllEmployees() {
    this.apiEmployeeService.getList().subscribe({
      next: (res) => {
        this.empleadosList = res;
      },
      error: (err) => {
        alert('Error while fetching Employees:/Empleado/ReadAll records!');
      },
    });
  }
}
