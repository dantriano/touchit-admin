import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormComponent } from "@views/common/form/form.component";
import { Observable } from "rxjs";
import { config } from "./_options";
import { ActivityService, CompanyService } from "app/@core/services";
import { find } from "@utils/commons.service";

@Component({
  selector: "groups-form",
  templateUrl: "./groups-form.component.html",
})
export class GroupsFormComponent extends FormComponent {
  public activities: any[];
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
      main: [""],
      activities: [[]],
      options: [[]],
    };
  }

  loadContent() {
    this.companyService.companyData$.subscribe((data) => {  
      let formData = find(data?.groups, this.config._id);
      this.activities = data.activities;
      this.obs.next(formData);
    });
  }
  saveForm() {
    let company = this.companyService.data;
    company.groups.push(this.form.value);
    this.companyService.save(company).subscribe(this.submitObserver);
  }
  /*loadContent() {
    return zip(
      this.companyService.companyData$,
      this.services.activity.loadList({ company: this.config.company })
    );
  }*/
}
