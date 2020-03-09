import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { TimelineComponent } from './../timeline/timeline.component';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule,
    TooltipModule.forRoot(),
    ButtonsModule.forRoot()
  ],
  declarations: [ DashboardComponent,TimelineComponent ]
})
export class DashboardModule { }
