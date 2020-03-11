import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TablesRoutingModule, routedComponents } from './settings-routing.module';
import { SettingsMainComponent } from './settings-main/settings-main.component';

import { LocationsListComponent } from './../locations/locations-list/locations-list.component';
import { GroupsListComponent } from './../groups/groups-list/groups-list.component';
import { ActivitiesListComponent } from '../activities/activities-list/activities-list.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { SettingsComponent } from './settings.component';

import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AgmCoreModule, GoogleMapsAPIWrapper } from "@agm/core";
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {MatListModule} from '@angular/material/list';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    CommonModule,
    TablesRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ModalModule.forRoot(),
    BsDropdownModule,
    PerfectScrollbarModule,
    MatListModule,
    NgxMaterialTimepickerModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCwkq46Hp4vRycflNkA7JauXKn0W9TXo4w',
      libraries: ['places', 'drawing', 'geometry'],
    }),
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [SettingsComponent,SettingsMainComponent],
  bootstrap: [SettingsComponent,SettingsMainComponent],
  declarations: [
    ...routedComponents
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class SettingsModule { }
