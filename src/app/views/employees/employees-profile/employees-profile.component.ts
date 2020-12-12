import { Component } from "@angular/core";
import { config } from "./_options";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "employees-profile",
  templateUrl: "./employees-profile.component.html",
})
export class EmployeesProfileComponent {
  private _config: any = {};
  set config(obj) {
    this._config = { ...this._config, ...obj };
  }
  get config() {
    return this._config;
  }
  loadComponent() {
    this.config = config;
  }
}
