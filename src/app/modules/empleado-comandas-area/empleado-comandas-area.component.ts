import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ApiEmployeeService } from '../../services/apiEmployee/api-employee.service';
import { Empleado } from '../../shared/models/Empleado';

@Component({
  selector: 'app-empleado-comandas-area',
  templateUrl: './empleado-comandas-area.component.html',
  styleUrls: ['./empleado-comandas-area.component.scss'],
})
export class EmpleadoComandasAreaComponent implements OnInit {
  empleados = [];
  chartOptions = {};
  nombreEmpleados: string[] = [];
  Highcharts = Highcharts;

  listaComanda: number[] = [];
  listaPreparada: number[] = [];
  listaRechazada: number[] = [];
  series: [] = [];
  constructor(private apiEmployeeService: ApiEmployeeService) {}
  ngOnInit(): void {
    this.apiEmployeeService.getList().subscribe((empleados: any[]) => {
      empleados.forEach((empleado: any) => {
        this.nombreEmpleados.push(empleado.Nombre);

        if (empleado.Comandas.length == 0) {
          this.listaComanda.push(0);
          this.listaPreparada.push(0);
          this.listaRechazada.push(0);
        } else {
          var comandas = 0;
          var preparadas = 0;
          var rechazadas = 0;
          empleado.Comandas.forEach((pedido: any) => {
            switch (pedido.EstadoPedido) {
              case 1:
                comandas++;
                break;
              case 2:
                preparadas++;
                break;
              case 3:
                rechazadas++;
                break;
              default:
                break;
            }
          });
          this.listaComanda.push(comandas);
          this.listaPreparada.push(preparadas);
          this.listaRechazada.push(rechazadas);
        }
      });
      console.log(this.listaComanda);
      console.log(this.listaPreparada);
      console.log(this.listaRechazada);
      console.log(this.nombreEmpleados);
      // @ts-ignore
      var chart = Highcharts.chart('container-empleado-comanda', {
        chart: {
          type: 'column',
        },
        title: {
          text: 'Comandas por empleado',
        },

        xAxis: {
          categories: this.nombreEmpleados,
          crosshair: true,
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Numero de comandas',
          },
        },
        tooltip: {
          headerFormat:
            '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat:
            '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y} comandas</b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true,
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0,
          },
        },
        series: [
          {
            name: 'Comanda',
            data: this.listaComanda,
          },
          {
            name: 'Preparada',
            data: this.listaPreparada,
          },
          {
            name: 'Rechazada',
            data: this.listaRechazada,
          },
        ],
      });
    });
  }
}

// chart: {
//          type: 'column',
//        },
//        title: {
//          text: 'Comandas por empleado',
//        },
//        xAxis: {
//          categories: ['chahi', 'juan', 'ayoub'],
//          crosshair: true,
//        },
//        yAxis: {
//          min: 0,
//          title: {
//            text: 'Rainfall (mm)',
//          },
//        },
//        tooltip: {
//          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
//          pointFormat:
//            '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
//            '<td style="padding:0"><b>{point.y}</b></td></tr>',
//          footerFormat: '</table>',
//          shared: true,
//          useHTML: true,
//        },
//        plotOptions: {
//          column: {
//            pointPadding: 0.2,
//            borderWidth: 0,
//          },
//        },
//        series: [
//          {
//            name: 'Comanda',
//            data: [0, 4, 0],
//          },
//          {
//            name: 'Preparada',
//            data: [0, 4, 0],
//          },
//          ,
//          {
//            name: 'Rechazada',
//            data: [0, 4, 0],
//          },
//        ],
