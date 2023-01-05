import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ApiPedidoService } from '../../../services/apiPedido/api-pedido.service';
import * as moment from 'moment';

@Component({
  selector: 'app-column',
  templateUrl: './column-chart.component.html',
  styleUrls: ['./column-chart.component.scss'],
})
export class ColumnChartComponent implements OnInit {
  // chart column options

  public options: any;
  constructor(private apiPedidoService: ApiPedidoService) {}

  ngOnInit(): void {
    var d = new Date();
    d.setDate(d.getDate() - 6);
    var data: any = [
      [Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()), 0],
      [Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + 1), 0],
      [Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + 2), 0],
      [Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + 3), 0],
      [Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + 4), 0],
      [Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + 5), 0],
    ];

    this.apiPedidoService.getList().subscribe((res) => {
      var last7Days: any[] = [];

      data.forEach((dataDia: any) => {
        last7Days.push(moment(dataDia[0]).format());
      });
      this.apiPedidoService.dameComandasPorFecha().subscribe((res: any) => {
        var numberComandas = res;
        data = [
          [
            Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()),
            numberComandas[5],
          ],
          [
            Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + 1),
            numberComandas[4],
          ],
          [
            Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + 2),
            numberComandas[3],
          ],
          [
            Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + 3),
            numberComandas[2],
          ],
          [
            Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + 4),
            numberComandas[1],
          ],
          [
            Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + 5),
            numberComandas[0],
          ],
        ];

        this.options = {
          chart: {
            type: 'column',
          },
          title: {
            text: 'Pedidos',
          },
          subtitle: {
            text: '' + '' + '',
          },
          xAxis: {
            type: 'datetime',
          },
          yAxis: {
            title: {
              useHTML: true,
              text: '',
            },
          },
          tooltip: {
            headerFormat:
              '<span style="font-size:10px">{point.key}</span><table>',
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
              data: data,
            },
          ],
        };
        Highcharts.chart('column-container', this.options);
      });
    });
  }
}
