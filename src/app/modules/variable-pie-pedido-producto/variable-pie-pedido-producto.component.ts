import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import * as HighchartsMore from 'highcharts/highcharts-more';
import * as HighchartsExporting from 'highcharts/modules/exporting';
import * as Variablepie from 'highcharts/modules/variable-pie';
import { ApiLineaComandaService } from 'src/app/services/apiLineaComanda/api-linea-comanda.service';
import { ApiPlatoService } from 'src/app/services/apiPlato/api-plato.service';

@Component({
  selector: 'app-variable-pie-pedido-producto',
  templateUrl: './variable-pie-pedido-producto.component.html',
  styleUrls: ['./variable-pie-pedido-producto.component.scss'],
})
export class VariablePiePedidoProductoComponent implements OnInit {
  chart: any;
  chartConstructor = 'chart';
  updateFromInput = false;
  Highcharts = Highcharts;
  chartCallback: any;
  chartOptions: any;
  platos: any;
  data: {
    name: string;
    y: number;
  }[] = [];
  constructor(
    private apiPlatoService: ApiPlatoService,
    private apiLineaComandaService: ApiLineaComandaService
  ) {
    const self = this;
    this.chartCallback = (chart: any) => {
      self.chart = chart;
    };
  }

  ngOnInit(): void {
    this.apiPlatoService.getList().subscribe((res: any) => {
      this.platos = res;
      // await until loadDiagram data loaded
      this.loadDiagram();
      setTimeout(() => {
        this.chartOptions = {
          chart: {
            type: 'pie',
          },
          title: {
            text: 'Pedidos por plato',
          },
          tooltip: {
            headerFormat: '',
            pointFormat: '{point.name} <br/> <b>Pedidos: {point.y}</b>',
          },
          series: [
            {
              name: 'Platos',
              colorByPoint: true,
              // data: [
              //   {
              //     name: 'Chrome',
              //     y: 61.41,
              //   },
              //   {
              //     name: 'Internet Explorer',
              //     y: 11.84,
              //   },
              //   {
              //     name: 'Firefox',
              //     y: 10.85,
              //   },
              //   {
              //     name: 'Edge',
              //     y: 4.67,
              //   },
              //   {
              //     name: 'Safari',
              //     y: 4.18,
              //   },
              //   {
              //     name: 'Sogou Explorer',
              //     y: 1.64,
              //   },
              //   {
              //     name: 'Opera',
              //     y: 1.6,
              //   },
              //   {
              //     name: 'QQ',
              //     y: 1.2,
              //   },
              //   {
              //     name: 'Other',
              //     y: 2.61,
              //   },
              // ],
              data: this.data,
            },
          ],
        };
        Highcharts.chart('container-pievariable', this.chartOptions);
      }, 1000);
    });
  }
  async loadDiagram() {
    this.apiPlatoService.getList().subscribe((res) => {
      // var d = new Date();
      // d.setDate(d.getDate() - 7);
      res.forEach(async (plato, index) => {
        // check if plato has caja
        (async () => {
          const data = await this.apiLineaComandaService
            .getAllLineaComandaOfPlato(plato.Id)
            .subscribe((res) => {
              var y: number = 0;
              if (res != null) {
                res.forEach((lineaComanda) => {
                  y++;
                });
              }
              this.data.push({ name: plato.Nombre, y: y });
            });
        })();
      });
    });
    return this.data;
  }
}
