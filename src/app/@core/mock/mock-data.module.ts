import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as mocks from "./";
import { Route } from '@angular/router';

const SERVICES = [
  //{ provide: data.UsersData, useClass: mocks.UsersService },
  //{ provide: data.EmployeeData, useClass: mocks.EmployeeService },
  //{ provide: data.EventsData, useClass: mocks.EventsService },
  //{ provide: data.GroupData, useClass: mocks.GroupService },
  //{ provide: data.LocationData, useClass: mocks.LocationService },
];


@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    ...SERVICES,
  ],
})
export class MockDataModule {
  static forRoot(): ModuleWithProviders<Route>  {
    return <ModuleWithProviders<Route> >{
      ngModule: MockDataModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
