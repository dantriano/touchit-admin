import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { ListComponent } from "app/common/list.component";
import { AuthenticationService } from "app/@core/utils";
import { EmployeeService } from "app/@core/services";
import { Observable, Subject } from 'rxjs';
import { Employee } from 'app/@core/models';

@Component({
  selector: "employees-list",
  templateUrl: "./employees-list.component.html",
})
export class EmployeesListComponent extends ListComponent implements OnInit {
  private employees:Observable<Employee[]>
  constructor(private employeeService: EmployeeService) {
    super(null, null);
  }
  public loadComponent() {
    const input = {'company':this.company}
    this.service = this.employeeService;

    this.employees=this.employeeService.employees;
    this.employeeService.getList(input)
    this.employees.subscribe(x=>this.listData.next(x));
    this.set("displayedColumns", [
      /*'avatar', 'employeeId',/* 'employeeCode'*/
      "firstName",
      "lastName",
      "groups",
      "options",
    ]);
  }
}
