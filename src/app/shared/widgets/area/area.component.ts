import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_gantt from 'highcharts/modules/gantt';

@Component({
  selector: 'app-widget-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss'],
})
export class AreaComponent implements OnInit {
  chartOptions = {};
  Highcharts = Highcharts;
  constructor() {}

  ngOnInit(): void {
    this.chartOptions = {
      chart: {
        type: 'area',
      },
      title: {
        text: 'Ventas',
      },
      subtitle: {
        text: 'By: Time',
      },
      tooltip: {
        split: true,
        valueSuffix: ' euros',
      },
      credits: {
        enabled: false,
      },
      exporting: {
        enabled: true,
      },
      series: [
        {
          name: 'Restaurante X',
          data: [57000, 63500, 80900, 94700, 14020, 36340, 52680],
        },
        {
          name: 'Restaurante Y',
          data: [10600, 10700, 11100, 13300, 22100, 76700, 17660],
        },
        {
          name: 'Restaurante Z',
          data: [16300, 20300, 27600, 40800, 54700, 72900, 62800],
        },
        {
          name: 'Restaurante K',
          data: [18000, 31000, 54000, 15600, 33900, 81800, 120100],
        },
        {
          name: 'Restaurante H',
          data: [54800, 25200, 48000, 65400, 13100, 30005, 46780],
        },
      ],
    };
    HC_gantt(Highcharts);
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
  }
}
