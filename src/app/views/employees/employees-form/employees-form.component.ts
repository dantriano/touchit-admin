import { Component, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { EmployeeData } from './../../../@core/data'
import { ToastrService } from 'ngx-toastr';
import { FormComponent } from 'app/views/common/form.component';

@Component({
  selector: 'employees-form',
  templateUrl: './employees-form.component.html',
})

export class EmployeesFormComponent extends FormComponent {
  private default: String = 'default';
  constructor(public componentService: EmployeeData, public route: ActivatedRoute, public router: Router, public toastr: ToastrService) {
    super(route,router,toastr);
  }
  @ViewChildren('customSelected') cs;
  public loadComponent(){
    const validators=this.get('validators');
    this.set('customOptions',[
      {'value':'on','label':'btn btn-success','span':'fa fa-check'},
      {'value':'default','label':'btn btn-secondary','span':'fa fa-circle-o'},
      {'value':'off','label':'btn btn-danger','span':'fa fa-close'},
    ])
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
  getCustomStatus(id){
    var customStatus = this.find(this.form.value.customActivities,id).status || 'default';
    var activitiesByGroup = false
    this.formData.groups.filter(item => this.form.value.groups.includes(item._id)).filter(item => item.activities.includes(id)).forEach( function(item) {
      activitiesByGroup=true
    },activitiesByGroup)
      return ((customStatus==='on'||activitiesByGroup) && !(customStatus==='off'))
  }
  setCustomOption(){
    var selectedOptions = this.cs._results.filter(item => item.nativeElement.checked).map(item => ({'_id':item.nativeElement.getAttribute('custom-id'),'status':item.nativeElement.value}));
    this.form.controls.customActivities.setValue(selectedOptions);
  }
  getCustomOption(id){
    return this.find(this.formData.employee.customActivities,id).status||'default'
  }
  groupSelected(list){
    var selectedOptions = list.selectedOptions.selected.map(item => item.value);
    this.form.controls.groups.setValue(selectedOptions);
  }
  
}

