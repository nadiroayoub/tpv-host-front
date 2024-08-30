import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { AreaComponent } from './widgets/area/area.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { CardComponent } from './widgets/card/card.component';
import { PieComponent } from './widgets/pie/pie.component';
import { CalendarComponent } from './widgets/calendar/calendar.component';
import { CalendarModule } from '@syncfusion/ej2-angular-calendars';
import { ColumnChartComponent } from './widgets/column/column-chart.component';
import { BarComponent } from './widgets/bar/bar.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { MatInputModule } from '@angular/material/input';
import { TitleCasePipe } from './pipe/title-case.pipe';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AreaComponent,
    CardComponent,
    PieComponent,
    CalendarComponent,
    ColumnChartComponent,
    BarComponent,
    ErrorMessageComponent,
    TitleCasePipe,
    SpinnerComponent,
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatMenuModule,
    MatListModule,
    RouterModule,
    HighchartsChartModule,
    CalendarModule,
    MatInputModule,
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    AreaComponent,
    CardComponent,
    PieComponent,
    CalendarComponent,
    ColumnChartComponent,
    BarComponent,
    ErrorMessageComponent,
    TitleCasePipe,
  ],
})
export class SharedModule {}
