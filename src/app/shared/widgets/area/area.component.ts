import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_gantt from 'highcharts/modules/gantt';
import { ApiNegocioService } from '../../../services/apiNegocio/api-negocio.service';
import { ApiCajaService } from '../../../services/apiCaja/api-caja.service';
import * as moment from 'moment';

@Component({
  selector: 'app-widget-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss'],
})
export class AreaComponent implements OnInit {
  chartOptions = {};
  Highcharts = Highcharts;
  negocios = [];
  series: { name: string; data: any[] }[] = [];

  constructor(
    private apiNegocioService: ApiNegocioService,
    private apiCajaService: ApiCajaService
  ) {}

  ngOnInit(): void {
    this.apiNegocioService.getList().subscribe((res: any) => {
      this.negocios = res;
    });
    // await until loadDiagram data loaded
    this.loadDiagram();
    // setTimeout(() => {
    //   for (let i = 0; i < this.series.length; i++) {
    //     // for every serie data, we need to add datetime
    //     var newData: any = [];
    //     this.series[i].data.forEach((element: number[], key) => {
    //       var elem = [];
    //       elem.push(element);
    //       elem
    //         .unshift
    //         // Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + key)
    //         ();
    //       newData.push(elem);
    //     });
    //     this.series[i].data = newData;
    //   }
    // }, 3000);
    setTimeout(() => {
      this.chartOptions = {
        chart: {
          type: 'column',
        },
        title: {
          text: 'Saldo por caja',
        },
        xAxis: {
          tickInterval: 1,
          labels: {
            enabled: true,
            formatter: function () {},
          },
        },
        yAxis: {
          title: {
            text: 'Saldo',
          },
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0,
          },
        },
        tooltip: {
          backgroundColor: '#e2f2f9',
          borderColor: 'none',
          borderRadius: 0,
          borderWidth: 0,
          headerFormat:
            '<b>{point.point.name}</b></br>Saldo:{point.point.y}</br>',
          pointFormat: '',
        },
        series: this.series,
      };
      Highcharts.chart('container', this.chartOptions);
    }, 500);
  }
  last7Days() {
    const dates = [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i - 1);
      return d;
    });
    return dates;
  }
  async loadDiagram() {
    this.apiNegocioService.getList().subscribe((res) => {
      // var d = new Date();
      // d.setDate(d.getDate() - 7);
      var series;
      res.forEach(async (negocio, index) => {
        // check if negocio has caja
        this.series.push({ name: negocio.Nombre, data: [] });
        (async () => {
          const data = await this.apiCajaService
            .dameCajaPorNegocio(negocio.Id)
            .subscribe((res) => {
              var seriesCajaData: any[] = [];
              res.forEach((caja) => {
                seriesCajaData.push([caja.Descripcion, caja.Saldo]);
              });
              this.series[index].data = seriesCajaData;
              console.log(this.series);
            });
        })();
      });
    });
    return this.series;
  }
}
