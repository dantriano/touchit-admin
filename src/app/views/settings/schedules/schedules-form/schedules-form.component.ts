import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormComponent } from "@views/common/form/form.component";
import { Observable, zip } from "rxjs";
import { config } from "./_options";
import { LocationService, ScheduleService } from "app/@core/services";

@Component({
  selector: "schedules-form",
  templateUrl: "./schedules-form.component.html",
})
/**
 * Component to generate the Schedules Form Page
 */
export class SchedulesFormComponent extends FormComponent {
  public schedule: Observable<any>;
  public locations: Observable<any>;
  constructor(
    public activatedRoute: ActivatedRoute,
    public scheduleService: ScheduleService,
    public locationService: LocationService
  ) {
    super(activatedRoute);
    this.services = {
      schedule: this.scheduleService,
      location: this.locationService,
    };
  }
  /**
   * Load the component elements and configuration
   */
  loadComponent() {
    this.config = config;
    this.schedule = this.services.schedule.getOneObs;
    this.locations = this.services.location.getListObs;

    this.config.formInputs = {
      _id: [""],
      //name: ['', [validators.required],[validators.valueExist()]],
      name: ["", [this.validators.required]],
      locations: [[]],
      options: [[]],
      startFrom: [""],
      startTo: [""],
      company: [this.config.company],
      days: [[]],
      duration: [""],
    };
  }

  loadContent() {
    return zip(
      this.services[this.config.service].loadOne(this.config.query),
      this.services.location.loadList({ company: this.config.company })
    );
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
