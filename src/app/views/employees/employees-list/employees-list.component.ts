import { Component, OnInit } from '@angular/core';
import {  EmployeeData } from './../../../@core/data/';
import { ToastrService } from 'ngx-toastr';
import { ListComponent } from 'app/views/common/list.component';

@Component({
  selector: 'employees-list',
  templateUrl: './employees-list.component.html',
})
export class EmployeesListComponent extends ListComponent implements OnInit {
  constructor(private componentService: EmployeeData, public toastr: ToastrService) {
    super(toastr);
  }
  public loadComponent() {
    this.set('model', 'employees');
    this.set('service', this.componentService);
    this.set('displayedColumns', ['avatar',/* 'employeeId', 'employeeCode'*/ 'firstName', 'lastName', 'groups', 'options']);
  }
}
