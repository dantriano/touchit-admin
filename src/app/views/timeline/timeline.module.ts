import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimelineComponent } from './../timeline/timeline.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
  imports: [
    CommonModule,
    TooltipModule.forRoot()
  ],
  declarations: [ TimelineComponent ]
})
export class TimelineModule { }
