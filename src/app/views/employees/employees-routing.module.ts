import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeesComponent } from './employees.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { EmployeesCalendarComponent } from './employees-calendar/employees-calendar.component';
import { EmployeesProfileComponent } from './employees-profile/employees-profile.component';
import { EmployeesFormComponent } from './employees-form/employees-form.component';


const routes: Routes = [{
  path: '',
  component: EmployeesComponent,
  data: {
    breadcrumbs: true,
    text: 'Employees'
  },
  children: [
    {
      path: '',
      children: [
        {
          path: '',
          component: EmployeesListComponent,
          data: {
            breadcrumbs: true,
            text: 'Employees'
          }
        },
        {
          path: 'edit',
          children: [
            {
              path: '',
              component: EmployeesFormComponent,
              data: {
                // Uses static text (Home)
                text: 'Employees'
              }
            },
            {
              path: ':id',
              component: EmployeesFormComponent,
              data: {
                text: 'Employees'
              }
            },
          ]
        },


        {
          path: 'profile/:id',
          component: EmployeesProfileComponent, data: {
            breadcrumbs: 'Profile'
          }
        }
      ]
    },
    {
      path: 'employees-calendar',
      component: EmployeesCalendarComponent, data: {
        // Uses last urlfragment (about) as text
        breadcrumbs: true
      }
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablesRoutingModule { }

export const routedComponents = [
  EmployeesComponent,
  EmployeesListComponent,
  EmployeesCalendarComponent,
  EmployeesProfileComponent,
];
