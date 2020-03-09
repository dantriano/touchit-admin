import { Component } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { RegisterData } from '../../../@core/data'
import { ToastrService } from 'ngx-toastr';
import { FormComponent } from 'app/views/common/form.component';

@Component({
  selector: 'registers-form',
  templateUrl: './registers-form.component.html',
})

export class RegistersFormComponent extends FormComponent {
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
      activity:['',this.validators.required],
    })
  }
}

