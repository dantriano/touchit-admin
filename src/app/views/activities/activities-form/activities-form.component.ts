import { Component } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { ActivityData } from './../../../@core/data'
import { ToastrService } from 'ngx-toastr';
import { FormComponent } from 'app/views/common/form.component';
@Component({
  selector: 'activites-form',
  templateUrl: './activities-form.component.html',
})

export class ActivitiesFormComponent extends FormComponent {
  constructor(public componentService: ActivityData, public route: ActivatedRoute, public router: Router, public toastr: ToastrService) {
    super(route,router,toastr);
  }
  public loadComponent(){
    const validators=this.get('validators');
    this.set('uiName','Activity');
    this.set('model','activity');
    this.set('service',this.componentService);
    this.set('formInputs', {
      _id: [''],
      name: ['', [validators.required],[validators.valueExist()]],
      locations: [[]],
      options: [[]]
    })
  }

  goLocation(location) {
    let center= location.zones[0].latsLngs[0]
    this.mapMgr.map.setCenter(center);
    this.mapMgr.resetPoligon()
    location.zones.forEach(element => {
      this.mapMgr.loadPoligons(element);
    });
  }
  
}

