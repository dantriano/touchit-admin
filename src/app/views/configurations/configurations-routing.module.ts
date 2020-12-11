import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ConfigurationsComponent } from "./configurations.component";
import { ConfigurationsListComponent } from "./options-list/options-list.component";
import { OptionsFormComponent } from "./options-form/options-form.component";
import { ConfigurationsMainComponent } from "./main/configurations-main.component";

const routes: Routes = [
  {
    path: "",
    component: ConfigurationsComponent,
    children: [
      {
        path: "",
        component: ConfigurationsMainComponent,
        data: {
          title: "",
        },
      },
      {
        path: "options",
        children: [
          {
            path: "edit",
            children: [
              {
                path: "",
                component: OptionsFormComponent,
                data: {
                  // Uses static text (Home)
                  text: "Options",
                },
              },
              {
                path: ":id",
                component: OptionsFormComponent,
                data: {
                  text: "Options",
                },
              },
            ],
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablesRoutingModule {}

export const routedComponents = [
  ConfigurationsMainComponent,
  ConfigurationsComponent,
  ConfigurationsListComponent,
  OptionsFormComponent,
];
