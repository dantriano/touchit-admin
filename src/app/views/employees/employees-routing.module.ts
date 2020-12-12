import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { EmployeesListComponent } from "./employees-list/employees-list.component";
import { EmployeesProfileComponent } from "./employees-profile/employees-profile.component";
import { EmployeesFormComponent } from "./employees-form/employees-form.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: EmployeesListComponent,
        data: {
          title: "",
        },
      },
      {
        path: "edit",
        data: {
          title: "Edit",
        },
        children: [
          {
            data: {
              title: "Create",
            },
            path: "",
            component: EmployeesFormComponent,
          },
          {
            path: ":id",
            component: EmployeesFormComponent,
          },
        ],
      },

      {
        path: "profile/:id",
        data: {
          title: "View Profile",
        },
        component: EmployeesProfileComponent,
      },
    ],
    /*data: {
    breadcrumbs: true,
    text: 'Employees'
  },*/
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablesRoutingModule {}

export const routedComponents = [
  EmployeesListComponent,
  EmployeesProfileComponent,
  EmployeesFormComponent,
];
