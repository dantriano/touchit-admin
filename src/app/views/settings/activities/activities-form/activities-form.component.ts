import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { ToastrService } from "ngx-toastr";
import { FormComponent } from "@views/common/form/form.component";
import { AuthenticationService } from "app/@core/utils";
import { ActivityService } from "app/@core/services";

@Component({
  selector: "activites-form",
  templateUrl: "./activities-form.component.html",
})
export class ActivitiesFormComponent extends FormComponent {
  daysWeek: any = [
    { _id: 0, name: "Monday" },
    { _id: 1, name: "Tuesday" },
    { _id: 2, name: "Wensday" },
    { _id: 3, name: "Thursday" },
    { _id: 4, name: "Friday" },
    { _id: 5, name: "Saturday" },
    { _id: 6, name: "Sunday" },
  ];
  protected model: string = "activity";
  constructor(
    public service: ActivityService,
    public route: ActivatedRoute,
    public router: Router,
    public toastr: ToastrService,
    public authService: AuthenticationService
  ) {
    super(route, router, toastr);
  }
  loadComponent() {
    this.company = this.authService.company._id;
    this.config = { redirect: "settings", uiName: "Activity" };
    this.set("formInputs", {
      _id: [""],
      //name: ['', [validators.required],[validators.valueExist()]],
      name: ["", [this.validators.required]],
      locations: [[]],
      options: [[]],
      startFrom: [""],
      startTo: [""],
      company: [this.company],
      days: [[]],
      duration: [""],
    });
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
  previewLocation(location) {
    location.zones.forEach((e) => this.mapMgr.areaToPoligon(e));
    this.mapMgr.map.setCenter(location.zones[0].latsLngs[0]);
  }
}
