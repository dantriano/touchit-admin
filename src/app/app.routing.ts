import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Import Containers
import { DefaultLayoutComponent } from "./containers";

import { P404Component } from "./views/error/404.component";
import { P500Component } from "./views/error/500.component";
import { LoginComponent } from "./views/login/login.component";
import { RegisterComponent } from "./views/register/register.component";

import { AuthGuard } from "./auth.guard";
import { TestComponent } from "./views/test/test.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "test",
    component: TestComponent,
  },
  {
    path: "404",
    component: P404Component,
    data: {
      title: "Page 404",
    },
  },
  {
    path: "500",
    component: P500Component,
    data: {
      title: "Page 500",
    },
  },
  {
    path: "login",
    component: LoginComponent,
    data: {
      title: "Login Page",
    },
  },
  {
    path: "register",
    component: RegisterComponent,
    data: {
      title: "Register Page",
    },
  },
  {
    path: "employees",
    component: DefaultLayoutComponent,
    data: {
      title: "Employees",
    },
    loadChildren: () =>
      import("./views/employees/employees.module").then(
        (m) => m.EmployeesModule
      ),
  },
 {
    path: "registers",
    component: DefaultLayoutComponent,
    data: {
      title: "Registers",
    },
    loadChildren: () =>
      import("./views/registers/registers.module").then(
        (m) => m.RegistersModule
      ),
  },
  {
    path: "settings",
    component: DefaultLayoutComponent,
    data: {
      title: "Settings",
    },
    loadChildren: () =>
      import("./views/settings/settings.module").then((m) => m.SettingsModule),
  },
  {
    path: "configurations",
    component: DefaultLayoutComponent,
    data: {
      title: "Configuration",
    },
    loadChildren: () =>
      import("./views/configurations/configurations.module").then(
        (m) => m.ConfigurationsModule
      ),
  },
  {
    path: "",
    component: DefaultLayoutComponent,
    data: {
      title: "Home",
      path: "dashboard",
    },
    children: [
      {
        path: "dashboard",
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("./views/dashboard/dashboard.module").then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: "theme",
        loadChildren: () =>
          import("./views/theme/theme.module").then((m) => m.ThemeModule),
      },
    ],
  },
  { path: "**", component: P404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routedComponents = [];
