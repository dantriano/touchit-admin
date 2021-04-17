import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormComponent } from "@views/common/form/form.component";
import { Observable } from "rxjs";
import { config } from "./_options";
import { CompanyService } from "app/@core/services";
import { addOrReplace, find, genID } from "@utils/commons.service";
import { first } from "rxjs/operators";

declare const google: any;
@Component({
  selector: "locations-form",
  templateUrl: "./locations-form.component.html",
})
export class LocationsFormComponent extends FormComponent {
  public location: Observable<any>;
  constructor(
    public activatedRoute: ActivatedRoute,
    public companyService: CompanyService
  ) {
    super(activatedRoute, config);
  }
  /**
   * Load the component elements and configuration
   */
  loadComponent() {
    this.config.formInputs = {
      _id: genID(),
      //name: [null, [this.validators.required],[this.validators.valueExist()]],
      name: [null, [this.validators.required]],
      zones: [[], [this.validators.required]],
      //options: [[]]
    };
  }
  loadContent() {
    this.companyService.companyData$.pipe(first()).subscribe((data) => {
      let formData = find(data?.locations, this.config._id);
      this.obs.next(formData);
    });
  }
  saveForm() {
    this.companyService
      .loadData(this.authService.currentCompany)
      .pipe(first())
      .subscribe((company) => {
        company.locations = addOrReplace(company.locations, [this.form.value]);
        this.companyService.save(company).subscribe(this.submitObserver);
      });
  }
  onMapReady(map) {
    super.onMapReady(map);
    this.mapMgr.initDrawingManager();
    if (this.form.value.zones && this.form.value.zones.length > 0) {
      this.form.value.zones.forEach((e) => this.mapMgr.areaToPoligon(e));
      this.mapMgr.map.setCenter(this.form.value.zones[0].latsLngs[0]);
    }
    google.maps.event.addListener(
      this.mapMgr.drawingManager,
      "overlaycomplete",
      (event) => {
        this.createZone(event);
      }
    );
  }
  createZone(event) {
    let poligon = event.overlay;
    let zones = this.form.controls.zones.value;
    let points = poligon
      .getPath()
      .getArray()
      .map((e) => e.toJSON());
    zones.push({ latsLngs: points });
    this.form.controls.zones.setValue(zones);
    this.mapMgr.addPoligon(poligon);
  }
  //Delte selected zones
  deleteZone(index) {
    let zones = this.form.controls.zones.value;
    zones.splice(index, 1);
    this.form.controls.zones.setValue(zones);
    this.mapMgr.deletePoligon(index);
  }
}
