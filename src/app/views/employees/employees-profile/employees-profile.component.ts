import { Component, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { EmployeeData } from './../../../@core/data'
import { ToastrService } from 'ngx-toastr';
import { FormComponent } from 'app/views/common/form.component';

@Component({
  selector: 'employees-profile',
  templateUrl: './employees-profile.component.html',
})

export class EmployeesProfileComponent extends FormComponent {
  constructor(public componentService: EmployeeData, public route: ActivatedRoute, public router: Router, public toastr: ToastrService) {
    super(route,router,toastr);
    this.model='employee'
    this.service=componentService
  }
  public loadComponent(){
    this.config={'redirect':'employees'}
    this.set('formInputs', {
      _id: [''],
      linkCode:[this.componentService.generateCode()],
      firstName: [, [this.validators.required]],
      lastName: ['']});
  }
}
