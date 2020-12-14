import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { SettingsComponent } from "./settings.component";
import { SettingsMainComponent } from "./settings-main/settings-main.component";

import { ActivitiesFormComponent } from "./activities/activities-form/activities-form.component";
import { ActivitiesListComponent } from "./activities/activities-list/activities-list.component";

import { SchedulesFormComponent } from "./schedules/schedules-form/schedules-form.component";
import { SchedulesListComponent } from "./schedules/schedules-list/schedules-list.component";

import { LocationsFormComponent } from "./locations/locations-form/locations-form.component";
import { LocationsListComponent } from "./locations/locations-list/locations-list.component";

import { GroupsFormComponent } from "./groups/groups-form/groups-form.component";
import { GroupsListComponent } from "./groups/groups-list/groups-list.component";

const routes: Routes = [
  {
    path: "",
    component: SettingsComponent,
    children: [
      {
        path: "",
        component: SettingsMainComponent,
        data: {
          title: "",
        },
      },
      {
        path: "activities",
        children: [
          {
            path: "",
            component: ActivitiesListComponent,
            data: {
              title: "Activities",
            },
          },
        ],
      },
      {
        path: "activity",
        children: [
          {
            path: "",
            component: ActivitiesFormComponent,
            data: {
              title: "Activities",
            },
          },
          {
            path: ":id",
            component: ActivitiesFormComponent,
            data: {
              title: "Activities",
            },
          },
        ],
      },
      {
        path: "schedules",
        children: [
          {
            path: "",
            component: SchedulesListComponent,
            data: {
              title: "Activities",
            },
          },
        ],
      },
      {
        path: "schedule",
        children: [
          {
            path: "",
            component: SchedulesFormComponent,
            data: {
              title: "Schedules",
            },
          },
          {
            path: ":id",
            component: SchedulesFormComponent,
            data: {
              title: "Schedules",
            },
          },
        ],
      },
      {
        path: "locations",
        children: [
          {
            path: "",
            component: LocationsListComponent,
            data: {
              title: "Locations",
            },
          },
        ],
      },
      {
        path: "location",
        children: [
          {
            path: "",
            component: LocationsFormComponent,
            data: {
              title: "Locations",
            },
          },
          {
            path: ":id",
            component: LocationsFormComponent,
            data: {
              title: "Locations",
            },
          },
        ],
      },

      {
        path: "groups",
        children: [
          {
            path: "",
            component: GroupsListComponent,
            data: {
              title: "Groups",
            },
          },
        ],
      },
      {
        path: "group",
        children: [
          {
            path: "",
            component: GroupsFormComponent,
            data: {
              title: "Groups",
            },
          },
          {
            path: ":id",
            component: GroupsFormComponent,
            data: {
              title: "Groups",
            },
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
  SchedulesFormComponent,
  SchedulesListComponent,
  SettingsComponent,
  SettingsMainComponent,
  ActivitiesFormComponent,
  ActivitiesListComponent,
  LocationsFormComponent,
  LocationsListComponent,
  GroupsFormComponent,
  GroupsListComponent,
];
