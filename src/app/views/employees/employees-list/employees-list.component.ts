import { Component, OnInit } from "@angular/core";
import { ListComponent } from "app/common/list.component";
import { EmployeeService } from "app/@core/services";
import { config } from "./_options";
import { concat } from "rxjs";

@Component({
  //selector: "list-columns",
  templateUrl: '../../../common/views/list.component.html',
  inputs:['listType'],
})
export class EmployeesListComponent extends ListComponent implements OnInit {
  public listType:string = 'employees';
  constructor(protected employeeService: EmployeeService) {
    super();
  }
  loadComponent() {
    this.services = { employee: this.employeeService };
    this.config = config;
    this.dataTable = this.services.employee.employees;
  }

  loadContent(){
    return concat(
      this.services.employee.getList({ company: this.config.company }),
    );
  }
}
