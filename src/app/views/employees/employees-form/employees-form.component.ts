import { Component } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { EmployeeData } from './../../../@core/data'
import { ToastrService } from 'ngx-toastr';
import { FormComponent } from 'app/views/common/form.component';
import { Validators } from '@angular/forms';

@Component({
  selector: 'employees-form',
  templateUrl: './employees-form.component.html',
})

export class EmployeesFormComponent extends FormComponent {
  constructor(public componentService: EmployeeData, public route: ActivatedRoute, public router: Router, public toastr: ToastrService) {
    super(route,router,toastr);
  }
  public loadComponent(){
    const validators=this.get('validators');
    this.set('model','employee');
    this.set('service',this.componentService);
    let config=this.get('config')
    config.redirect='employees';
    this.set('config',config)
    this.set('formInputs', {
      _id: [''],
      options: [[]],
      customActivities: [[]],
      employeeCode: [''],
      isLinked:false,
      linkCode:[this.componentService.generateCode()],
      firstName: [, [validators.required]],
      lastName: [''],
      groups: [[]],
      mainActivity: [, [validators.required]],
      email: ['', [validators.email, validators.required],[validators.valueExist()]],
    })
  }
  makeCode() {
    return this.componentService.generateCode();
  }
  groupSelected(a,b){
    
  }
}

