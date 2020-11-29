import { Component } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { GroupData } from 'app/@core/data';
import { ToastrService } from 'ngx-toastr';
import { FormComponent } from 'app/common/form.component';

@Component({
  selector: 'groups-form',
  templateUrl: './groups-form.component.html',
})

export class GroupsFormComponent extends FormComponent {
  protected model:string = 'group';
  constructor(public service: GroupData, public route: ActivatedRoute, public router: Router, public toastr: ToastrService) {
    super(route,router,toastr);
  }
  public loadComponent(){
    this.config={'redirect':'settings','uiName':'Groups'}
    this.set('formInputs', {
      _id: [''],
      //name: ['', [validators.required],[validators.valueExist()]],
      name: ['', [this.validators.required]],
      main: [''],
      activities: [[]],
      options: [[]]
    })
  }
}

