import { Component } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { EmployeeData } from './../../../@core/data'
import { ToastrService } from 'ngx-toastr';
import { FormComponent } from 'app/views/common/form.component';

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
    this.set('config',config);
    this.set('displayedColumns', ['status','name', 'options']);
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
      email: ['', [validators.email, validators.required]],
      //email: ['', [validators.email, validators.required],[validators.valueExist()]],
    });
  }
  makeCode() {
    return this.componentService.generateCode();
  }
  groupSelected(list){
    //let selectedOptions = list.selectedOptions.selected.map(item => ({'id':item.value,'selected':'true'}));
    let selectedOptions = list.selectedOptions.selected.map(item => item.value);
    this.form.controls.groups.setValue(selectedOptions);
  }
}

