import { Component, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { EmployeeData } from './../../../@core/data'
import { ToastrService } from 'ngx-toastr';
import { FormComponent } from 'app/views/common/form.component';

@Component({
  selector: 'employees-form',
  templateUrl: './employees-form.component.html',
})
/**
 * Component to generate the Employee Form Page
 */
export class EmployeesFormComponent extends FormComponent {
  @ViewChildren('customSelected') cs;
  constructor(public componentService: EmployeeData, public route: ActivatedRoute, public router: Router, public toastr: ToastrService) {
    super(route,router,toastr);
    this.model='employee'
    this.service=componentService
  }
  public loadComponent(){
    this.config={'redirect':'employees'}
    this.set('customOptions',[
      {'value':'on','label':'btn btn-success','span':'fa fa-check'},
      {'value':'default','label':'btn btn-secondary','span':'fa fa-circle-o'},
      {'value':'off','label':'btn btn-danger','span':'fa fa-close'},
    ])
    this.set('displayedColumns', ['status','name', 'options']);
    this.set('formInputs', {
      _id: [''],
      options: [[]],
      customActivities: [[]],
      employeeCode: [''],
      isLinked:false,
      linkCode:[this.componentService.generateCode()],
      firstName: [, [this.validators.required]],
      lastName: [''],
      groups: [[]],
      mainActivity: ['', [this.validators.required]],
      //email: ['', [validators.email, validators.required]],
      email: ['', [this.validators.email, this.validators.required],[this.validators.valueExist()]],
    });
  }

  /**
   * Generate a new random Code
   */
  makeCode() {
    return this.componentService.generateCode();
  }
  /**
   * Foreach available service returns its status for the current users depending on his group and custom option
   * @param id Service ID
   */
  getCustomStatus(id){
    var customStatus = this.find(this.form.value.customActivities,id).status || 'default';
    var activitiesByGroup = false
    this.formData.groups.filter(item => this.form.value.groups.includes(item._id)).filter(item => item.activities.includes(id)).forEach( function(item) {
      activitiesByGroup=true
    },activitiesByGroup)
      return ((customStatus==='on'||activitiesByGroup) && !(customStatus==='off'))
  }

  /**
   * Change the service option for the current user: on, off, default
   */
  setCustomOption(){
    var selectedOptions = this.cs._results.filter(item => item.nativeElement.checked).map(item => ({'_id':item.nativeElement.getAttribute('custom-id'),'status':item.nativeElement.value}));
    this.form.controls.customActivities.setValue(selectedOptions);
  }

  /**
   * Returns the stored custom option for the user to the service given
   * @param id Service ID
   */
  getCustomOption(id){
    return this.find(this.form.value.customActivities,id).status||'default'
  }

  /**
   * Apply to the form the groups un/selected for the user
   * @param list List of groups
   */
  groupSelected(list){
    var selectedOptions = list.selectedOptions.selected.map(item => item.value);
    this.form.controls.groups.setValue(selectedOptions);
  }
  
}

