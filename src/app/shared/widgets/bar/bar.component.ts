import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ApiCobroService } from 'src/app/services/apiCobro/api-cobro.service';
import { ApiNegocioService } from '../../../services/apiNegocio/api-negocio.service';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],
})
export class BarComponent implements OnInit {
  public options: any;
  private ciudades: string[] = [];
  private numeroCobrosPorCiudad: number[] = [];
  constructor(
    private apiNegocioService: ApiNegocioService,
    private apiCobroService: ApiCobroService
  ) {}

  ngOnInit(): void {
    this.apiNegocioService.getList().subscribe((res) => {
      res.forEach((negocio) => {
        // get all ciudades
        this.ciudades.push(negocio.Ciudad);
      });

      var tempMap: any = {}; // keep track of unique objects with key mapping to the object's key&value
      var distinctCiudades = []; // resulting list containing only unique objects
      var obj: any = null;
      for (var i = 0; i < this.ciudades.length; i++) {
        obj = this.ciudades[i];
        for (var key in obj) {
          // look in the object eg. {'one':1}
          if (obj.hasOwnProperty(key)) {
            if (!tempMap.hasOwnProperty(key + obj[key])) {
              // not in map
              tempMap[key + obj[key]] = obj; // then add it to map
              distinctCiudades.push(obj); // add it to our list of distinct objects
            }
            break;
          }
        }
      }

      this.apiCobroService
        .DameCobrosPorCiudad(distinctCiudades)
        .subscribe((res: number) => {
          this.numeroCobrosPorCiudad.push(res);
          this.options = {
            chart: {
              type: 'bar',
            },
            title: {
              text: 'Cobros Por ciudad',
            },
            xAxis: {
              categories: [this.ciudades[0]],
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
                name: 'Cobros',
                data: [this.numeroCobrosPorCiudad[0]],
              },
            ],
          };
          Highcharts.chart('container-bar', this.options);
        });
    });
  }
}
