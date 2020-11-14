import { Component } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { GroupData } from './../../../@core/data'
import { ToastrService } from 'ngx-toastr';
import { FormComponent } from 'app/views/common/form.component';

@Component({
  selector: 'groups-form',
  templateUrl: './groups-form.component.html',
})

export class GroupsFormComponent extends FormComponent {
  constructor(public componentService: GroupData, public route: ActivatedRoute, public router: Router, public toastr: ToastrService) {
    super(route,router,toastr);
  }
  public loadComponent(){
    const validators=this.get('validators');
    this.set('model','group');
    this.set('service',this.componentService);
    this.set('formInputs', {
      _id: [''],
      //name: ['', [validators.required],[validators.valueExist()]],
      name: ['', [validators.required]],
      main: [''],
      activities: [[]],
      options: [[]]
    })
  }
}

