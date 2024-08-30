import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ApiCobroService } from 'src/app/services/apiCobro/api-cobro.service';
import { ApiNegocioService } from '../../../services/apiNegocio/api-negocio.service';
import { Cobro } from '../../models/Cobro';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],
})
export class BarComponent implements OnInit {
  public options: any;
  private ciudades: string[] = [];
  private numeroCobrosPorNegocio: number[] = [];
  private nombreNegocios: string[] = [];
  constructor(
    private apiNegocioService: ApiNegocioService,
    private apiCobroService: ApiCobroService
  ) {}

  ngOnInit(): void {
    this.loadDiagramData();
    setTimeout(() => {
      this.options = {
        chart: {
          type: 'bar',
        },
        title: {
          text: 'Cobros Por negocio',
        },
        xAxis: {
          categories: this.nombreNegocios,
          title: {
            text: null,
          },
        },
        yAxis: {
          min: 0,
          title: {
            text: '',
            align: 'high',
          },
          labels: {
            overflow: 'justify',
          },
        },
        tooltip: {
          valueSuffix: '',
        },
        plotOptions: {
          bar: {
            dataLabels: {
              enabled: true,
            },
          },
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'top',
          x: -40,
          y: 80,
          floating: true,
          borderWidth: 1,
          backgroundColor:
            Highcharts.defaultOptions.legend!.backgroundColor || '#FFFFFF',
          shadow: true,
        },
        credits: {
          enabled: false,
        },
        series: [
          {
            name: 'Numero de Cobros',
            data: this.numeroCobrosPorNegocio,
          },
        ],
      };
      Highcharts.chart('container-bar', this.options);
    }, 1000);
  }
  loadDiagramData() {
    this.apiNegocioService.getList().subscribe((negocios) => {
      negocios.forEach((negocio) => {
        // push negocio to nombreNegocios
        
        // this.ciudades.push(negocio.Ciudad);
        // this.apiCobroService
        //   .dameCobroPorNegocio(negocio.Id)
        //   .subscribe((cobros: Cobro[]) => {
        //     this.numeroCobrosPorNegocio.push(cobros.length);
        //   });
        this.getCobros(negocio.Id, negocio.Nombre).then((data) => {
          console.log(data);
        });
      });
      console.log(this.numeroCobrosPorNegocio);
    });
  }

  getCobros(negocioId: any, negocioNombre:string) {
    return new Promise(async (resolve) => {
      this.apiCobroService
        .dameCobroPorNegocio(negocioId)
        .subscribe((cobros: Cobro[]) => {
          if(cobros != null){
            this.nombreNegocios.push(negocioNombre);
            this.numeroCobrosPorNegocio.push(cobros.length);
          }
        });
    });
  }
}
