import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistersComponent } from './registers.component';
import { RegistersListComponent } from './registers-list/registers-list.component';
import { RegistersFormComponent } from './registers-form/registers-form.component';

const routes: Routes = [{
  path: '',
  component: RegistersComponent,
  data: {
    breadcrumbs: false,
    text: 'Registers'
  },
  children: [
    {
      path: '',
      children: [
        {
          path: '',
          component: RegistersListComponent,
          data: {
            breadcrumbs: false,
            text: ''
          }
        },
        {
          path: 'edit',
          children: [
            {
              path: '',
              component: RegistersFormComponent,
              data: {
                // Uses static text (Home)
                text: 'Registers'
              }
            },
            {
              path: ':id',
              component: RegistersFormComponent,
              data: {
                text: 'Registers'
              }
            },
          ]
        },
      ]
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablesRoutingModule { }

export const routedComponents = [
  RegistersComponent,
  RegistersListComponent,
  RegistersFormComponent,
];
