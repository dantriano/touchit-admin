import { Component } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { ActivityData } from 'app/@core/data'
import { ToastrService } from 'ngx-toastr';
import { FormComponent } from 'app/common/form.component';

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
  protected model:string = 'activity';
  constructor(public service: ActivityData, public route: ActivatedRoute, public router: Router, public toastr: ToastrService) {
    super(route,router,toastr);
  }
  loadComponent(){
    this.config={'redirect':'settings','uiName':'Activity'}
    this.set('formInputs', {
      _id: [''],
      //name: ['', [validators.required],[validators.valueExist()]],
      name: ['', [this.validators.required]],
      locations: [[]],
      options: [[]],
      startFrom:[''],
      startTo:[''],
      days:[[]],
      duration:['']
    })
  }
  deleteLocation(el) {
    let locations = this.form.controls.locations.value;
    locations.splice(locations.indexOf(el._id), 1);
    this.form.controls.locations.setValue(locations);
  }
  addLocation(el) {
    let locations = this.form.controls.locations.value;
    locations.push(el._id);
    this.form.controls.locations.setValue(locations);
  }
  previewLocation(location){
      location.zones.forEach(e => this.mapMgr.areaToPoligon(e));
      this.mapMgr.map.setCenter(location.zones[0].latsLngs[0]);
  }
  
}

