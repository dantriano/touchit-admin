import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormComponent } from "@views/common/form/form.component";
import { Observable, zip } from "rxjs";
import { config } from "./_options";
import { CompanyService } from "app/@core/services";
import { addOrReplace, find } from "@utils/commons.service";
import { first } from "rxjs/operators";

@Component({
  selector: "schedules-form",
  templateUrl: "./schedules-form.component.html",
})
/**
 * Component to generate the Schedules Form Page
 */
export class SchedulesFormComponent extends FormComponent {
  public schedule: Observable<any>;
  public locations: any[];
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
      _id: [Math.floor(100000000 + Math.random() * 900000000)],
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
    this.companyService.companyData$.pipe(first()).subscribe((data) => {
      this.locations = data.locations;
      let formData = find(data?.schedules, this.config._id);
      this.obs.next(formData);
    });
  }
  saveForm() {
    this.companyService
      .loadData(this.authService.currentCompany)
      .pipe(first())
      .subscribe((company) => {
        company.schedules = addOrReplace(company.schedules, [this.form.value]);
        this.companyService.save(company).subscribe(this.submitObserver);
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
