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
  daysWeek:any=[
    {_id:0,name:'Monday'},
    {_id:1,name:'Tuesday'},
    {_id:2,name:'Wensday'},
    {_id:3,name:'Thursday'},
    {_id:4,name:'Friday'},
    {_id:5,name:'Saturday'},
    {_id:6,name:'Sunday'}

  ]
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
      options: [[]],
      startFrom:[''],
      startTo:[''],
      days:[[]],
      duration:['']
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

