import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as mocks from "./";
import * as data from "../data";

const SERVICES = [
  { provide: data.UsersData, useClass: mocks.UsersService },
  //{ provide: data.EmployeeData, useClass: mocks.EmployeeService },
  //{ provide: data.EventsData, useClass: mocks.EventsService },
  //{ provide: data.GroupData, useClass: mocks.GroupService },
  //{ provide: data.LocationData, useClass: mocks.LocationService },
  { provide: data.RegistersData, useClass: mocks.RegistersService },
  { provide: data.CompaniesData, useClass: mocks.CompaniesService },
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
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: MockDataModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
