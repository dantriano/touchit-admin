import { Component } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { LocationData } from './../../../@core/data'
import { ToastrService } from 'ngx-toastr';
import { FormComponent } from 'app/views/common/form.component';

declare const google: any;
@Component({
  selector: 'locations-form',
  templateUrl: './locations-form.component.html',
})

export class LocationsFormComponent extends FormComponent {
  lat: number = 21.149102499999998;
  lng: number = 72.77611639999999;
  zones =[]
  constructor(public componentService: LocationData, public route: ActivatedRoute, public router: Router, public toastr: ToastrService) {
    super(route,router,toastr);
  }
  public loadComponent(){
    const validators=this.get('validators');    
    this.set('uiName','Location');
    this.set('model','location');
    this.set('service',this.componentService);
    this.set('formInputs', {
      _id: [''],
      name: ['', [validators.required],[validators.valueExist()]],
      zones: [[],[validators.required]],
      options: [[]]
    })
  }
  onMapReady(map) {
    super.onMapReady(map)
    this.mapMgr.initDrawingManager();
    this.zones = this.form.value.zones?this.form.value.zones:[];
    if(this.form.value.zones && this.form.value.zones.length>0){
      this.form.value.zones.forEach(e => this.mapMgr.loadPoligons(e));
      this.mapMgr.center=this.form.value.zones[0].latsLngs[0]
      this.mapMgr.map.setCenter(this.mapMgr.center);
    }else{
      this.mapMgr.setCurrentPosition();
    }
    google.maps.event.addListener(this.mapMgr.drawingManager, 'overlaycomplete', (event) => {
      this.createZone(event)
    });
  }
  createZone(event){
    let poligon = event.overlay;
    let points=poligon.getPath().getArray().map((e)=>e.toJSON());    
    this.mapMgr.poligons.push(poligon);
    this.zones.push({latsLngs: points });
    this.form.controls.zones.setValue(this.zones);
  }
  //Delte selected zones
  deleteZone(index) {
    this.mapMgr.deletePoligon(index)
  }
  goLocation(location) {
    let center= location.latsLngs[0]
    this.mapMgr.map.setCenter(center);
    this.mapMgr.resetPoligon()
      this.mapMgr.loadPoligons(location);
  }
}

