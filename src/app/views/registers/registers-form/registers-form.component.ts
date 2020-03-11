import { Component, Input, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { RegisterData } from '../../../@core/data'
import { ToastrService } from 'ngx-toastr';
import { FormComponent } from 'app/views/common/form.component';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'registers-form',
  templateUrl: './registers-form.component.html',
})

export class RegistersFormComponent extends FormComponent {
  filteredEmployees:Observable<any[]>;
  data:any;
  employeeName:FormControl=new FormControl();
  constructor(public componentService: RegisterData, public route: ActivatedRoute, public router: Router, public toastr: ToastrService) {
    super(route,router,toastr);
  }
  public loadComponent(){
    this.set('model','register');
    this.set('service',this.componentService);
    let config=this.get('config')
    config.redirect='registers';
    this.set('config',config)
    this.set('formInputs', {
      _id: [''],
      employee:['',this.validators.required],
      activity:['',this.validators.required],
    })
    this.onLoadContent.subscribe(data=>{
      this.filteredEmployees = this.loadAutocomplete(data.employees,this.employeeName,'firstName')
      this.employeeName.setValue(data.register._employee.firstName)
    })
  }
}

