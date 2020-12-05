import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { of as observableOf } from 'rxjs';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { AnalyticsService } from './utils';

import * as data from "./data";
import * as models from "./models";
import { MockDataModule } from './mock/mock-data.module';
import { Route } from '@angular/router';

const socialLinks = [
  {
    url: 'https://github.com/akveo/nebular',
    target: '_blank',
    icon: 'github',
  },
  {
    url: 'https://www.facebook.com/akveo/',
    target: '_blank',
    icon: 'facebook',
  },
  {
    url: 'https://twitter.com/akveo_inc',
    target: '_blank',
    icon: 'twitter',
  },
];


const DATA_SERVICES = [
  { provide: data.EmployeeData, useClass: models.EmployeeModel },
  { provide: data.LocationData, useClass: models.LocationModel },
  { provide: data.ActivityData, useClass: models.ActivityModel },
  { provide: data.GroupData, useClass: models.GroupModel },
  { provide: data.ConfigurationData, useClass: models.ConfigurationModel },
  { provide: data.RegisterData, useClass: models.RegisterModel },
  { provide: data.UserData, useClass: models.UserModel },
];



export const NB_CORE_PROVIDERS = [
  ...MockDataModule.forRoot().providers,
  ...DATA_SERVICES,
  //AnalyticsService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders<Route>  {
    return <ModuleWithProviders<Route>>{
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
