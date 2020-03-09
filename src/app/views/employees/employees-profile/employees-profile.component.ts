import { Component } from '@angular/core';
import { Router,ActivatedRoute } from "@angular/router";
import { EmployeeData } from '../../../@core/data/employee';

@Component({
  selector: 'employees-profile',
  templateUrl: './employees-profile.component.html',
  styleUrls: ['./employees-profile.component.scss']
})

export class EmployeesProfileComponent {
  employeeData=null;
  constructor(private route: ActivatedRoute,private service: EmployeeData,private router: Router) {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.doSearch(params.id);
      }
    });
  }
  doSearch(term: string) {
    this.employeeData = this.service.getOne(term);
  }
}
