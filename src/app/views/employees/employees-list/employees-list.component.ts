import { Component, OnInit } from '@angular/core';
import {  EmployeeData } from 'app/@core/data/';
import { ToastrService } from 'ngx-toastr';
import { ListComponent } from 'app/common/list.component';

@Component({
  selector: 'employees-list',
  templateUrl: './employees-list.component.html',
})
export class EmployeesListComponent extends ListComponent implements OnInit {
  protected model:string = 'employees';
  constructor(protected service: EmployeeData, public toastr: ToastrService) {
    super(toastr);
  }
  public loadComponent() {
    this.set('displayedColumns', [/*'avatar', 'employeeId',/* 'employeeCode'*/ 'firstName', 'lastName', 'groups', 'options']);
  }
}
