import { Component } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { LocationData } from 'app/@core/data';
import { ToastrService } from 'ngx-toastr';
import { FormComponent } from 'app/views/common/form.component';

declare const google: any;
@Component({
  selector: 'locations-form',
  templateUrl: './locations-form.component.html',
})

export class LocationsFormComponent extends FormComponent {
  zones =[]
  constructor(public componentService: LocationData, public route: ActivatedRoute, public router: Router, public toastr: ToastrService) {
    super(route,router,toastr);
  }
  public loadComponent(){
    //const validators=this.get('validators');    
    this.set('uiName','Location');
    this.set('model','location');
    this.set('service',this.componentService);
    this.set('formInputs', {
      _id: [null],
      //name: [null, [this.validators.required],[this.validators.valueExist()]],
      name: [null, [this.validators.required]],
      zones: [[], [this.validators.required]],
      //options: [[]]
    })
  }
  onMapReady(map) {
    super.onMapReady(map)
    this.mapMgr.initDrawingManager();
    if(this.form.value.zones && this.form.value.zones.length>0){
      this.form.value.zones.forEach(e => this.mapMgr.areaToPoligon(e));
      this.mapMgr.map.setCenter(this.form.value.zones[0].latsLngs[0]);
    }
    google.maps.event.addListener(this.mapMgr.drawingManager, 'overlaycomplete', (event) => {
      this.createZone(event)
    });
  }
  createZone(event){
    let poligon = event.overlay; 
    let zones = this.form.controls.zones.value;
    let points=poligon.getPath().getArray().map((e)=>e.toJSON());    
    zones.push({latsLngs: points })
    this.form.controls.zones.setValue(zones);
    this.mapMgr.addPoligon(poligon) 
    
  }
  //Delte selected zones
  deleteZone(index) {
    let zones = this.form.controls.zones.value;
    zones.splice(index, 1);
    this.form.controls.zones.setValue(zones);
    this.mapMgr.deletePoligon(index);
  }
}

