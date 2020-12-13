import { Component, OnInit } from "@angular/core";
import { ListComponent } from "app/common/list.component";
import { EmployeeService } from "app/@core/services";
import { config } from "./_options";
import { concat } from "rxjs";

@Component({
  //selector: "list-columns",
  templateUrl: "../../../common/views/list.component.html",
})
export class EmployeesListComponent extends ListComponent implements OnInit {
  constructor(protected employeeService: EmployeeService) {
    super();
    this.services = { employee: this.employeeService };
  }
  loadComponent() {
    this.config = config;
    this.dataTable = this.services[this.config.service].getListObs;
  }
  loadContent() {
    return super.loadContent();
  }
}
