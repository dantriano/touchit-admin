import { Component, OnInit } from "@angular/core";
import { ListComponent } from "app/common/list.component";
import { EmployeeService } from "app/@core/services";
import { displayedColumns, listOptions, config } from "./_options";
import { concat, merge } from "rxjs";

@Component({
  //selector: "employees-list",
  templateUrl: "../../../views/common/list.component.html",
  //templateUrl: "@views/common/list.component.html",
})
export class EmployeesListComponent extends ListComponent implements OnInit {
  constructor(protected employeeService: EmployeeService) {
    super();
  }
  loadComponent() {
    this.services = { employee: this.employeeService };
    this.config = config;
    this.displayedColumns = displayedColumns;
    this.displayedOptions = listOptions;
    this.dataTable = this.services.employee.employees;
  }
  loadContent(){
    return concat(
      this.services.employee.getList({ company: this.company }),
    );
  }
}
