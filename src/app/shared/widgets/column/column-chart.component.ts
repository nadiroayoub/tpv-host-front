import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-column',
  templateUrl: './column-chart.component.html',
  styleUrls: ['./column-chart.component.scss'],
})
export class ColumnChartComponent implements OnInit {
  // chart column options
  public options: any = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Actividades',
    },
    subtitle: {
      text: '' + '' + '',
    },
    xAxis: {
      categories: ['LU', 'MA', 'MI', 'JU', 'VI', 'SA', 'DO'],
      crosshair: true,
    },
    yAxis: {
      title: {
        useHTML: true,
        text: '',
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
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
        name: 'Numero de pedidos',
        data: [33, 31, 33, 30, 57, 65, 66],
      },
    ],
  };
  constructor() {}

  ngOnInit(): void {
    Highcharts.chart('container', this.options);
  }
}
