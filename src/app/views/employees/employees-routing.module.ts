import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { EmployeesListComponent } from "./employees-list/employees-list.component";
import { EmployeesProfileComponent } from "./employees-profile/employees-profile.component";
import { EmployeesFormComponent } from "./employees-form/employees-form.component";

const routes: Routes = [
  {
    path: "",
    //component: ListViewComponent,
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
        children: [
          {
            path: "",
            component: EmployeesFormComponent,
            data: {
              text: "Employees",
            },
          },
          {
            path: ":id",
            component: EmployeesFormComponent,
            data: {
              text: "Employees",
            },
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
