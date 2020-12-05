import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';

import { AppAsideComponent } from './aside';
import { AppBreadcrumbComponent, CuiBreadcrumbComponent } from './breadcrumb';
import { AppFooterComponent } from './footer';
import { AppHeaderComponent } from './header';
import { AppSidebarComponent } from './sidebar';
import { RouterModule } from '@angular/router';
import { AppComponent } from 'app/app.component';
import { LayoutModule } from './shared/layout';

@NgModule({
  declarations: [
    AppAsideComponent,
    AppBreadcrumbComponent,
    CuiBreadcrumbComponent,
    AppFooterComponent,
    AppHeaderComponent,
    AppSidebarComponent
  ],
  imports: [
    LayoutModule,
    CommonModule,
    RouterModule
  ],
  exports: [
    AppAsideComponent,
    AppBreadcrumbComponent,
    CuiBreadcrumbComponent,
    AppFooterComponent,
    AppHeaderComponent,
    AppSidebarComponent
  ]
})
export class CoreuiModule { }
