import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ApiLineaComandaService } from 'src/app/services/apiLineaComanda/api-linea-comanda.service';
import { ApiMenuService } from 'src/app/services/apiMenu/api-menu.service';

@Component({
  selector: 'app-variable-pie-pedido-menu',
  templateUrl: './variable-pie-pedido-menu.component.html',
  styleUrls: ['./variable-pie-pedido-menu.component.scss'],
})
export class VariablePiePedidoMenuComponent implements OnInit {
  chart: any;
  chartConstructor = 'chart';
  updateFromInput = false;
  Highcharts = Highcharts;
  chartCallback: any;
  chartOptions: any;
  menus: any;
  data: {
    name: string;
    y: number;
  }[] = [];
  constructor(
    private apiMenuService: ApiMenuService,
    private apiLineaComandaService: ApiLineaComandaService
  ) {
    const self = this;
    this.chartCallback = (chart: any) => {
      self.chart = chart;
    };
  }

  ngOnInit(): void {
    this.apiMenuService.getList().subscribe((res: any) => {
      this.menus = res;
      // await until loadDiagram data loaded
      this.loadDiagram();
      setTimeout(() => {
        this.chartOptions = {
          chart: {
            type: 'pie',
          },
          title: {
            text: 'Pedidos por menu',
          },
          tooltip: {
            headerFormat: '',
            pointFormat: '{point.name} <br/> <b>Pedidos: {point.y}</b>',
          },
          series: [
            {
              name: 'Platos',
              colorByPoint: true,

              data: this.data,
            },
          ],
        };
        Highcharts.chart('container-pievariable-menu', this.chartOptions);
      }, 1000);
    });
  }
  async loadDiagram() {
    this.apiMenuService.getList().subscribe((res) => {
      // var d = new Date();
      // d.setDate(d.getDate() - 7);
      res.forEach(async (menu, index) => {
        // check if menu has caja
        (async () => {
          const data = await this.apiLineaComandaService
            .getAllLineaComandaOfMenu(menu.Id)
            .subscribe((res) => {
              var y: number = 0;
              if (res != null) {
                res.forEach((lineaComanda) => {
                  y++;
                });
              }
              this.data.push({ name: menu.Nombre, y: y });
            });
        })();
      });
    });
    return this.data;
  }
}
