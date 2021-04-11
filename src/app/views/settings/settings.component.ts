import { Component, OnInit, OnChanges } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { CompanyService } from "app/@core/services";
import { Observable } from "rxjs";

@Component({
  selector: "ngx-settings",
  template:
    "<lib-breadcrumbs></lib-breadcrumbs><router-outlet></router-outlet>",
})
export class SettingsComponent {}
