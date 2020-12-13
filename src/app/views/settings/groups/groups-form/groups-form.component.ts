import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormComponent } from "@views/common/form/form.component";
import { Observable, concat } from "rxjs";
import { config } from "./_options";
import { ActivityService, GroupService } from "app/@core/services";

@Component({
  selector: "groups-form",
  templateUrl: "./groups-form.component.html",
})
export class GroupsFormComponent extends FormComponent {
  public group: Observable<any>;
  public activities: Observable<any>;
  constructor(
    public activatedRoute: ActivatedRoute,
    public groupService: GroupService,
    public activityService: ActivityService
  ) {
    super(activatedRoute);
    this.services = {
      group: this.groupService,
      activity: this.activityService,
    };
  }
  /**
   * Load the component elements and configuration
   */
  loadComponent() {
    this.config = config;
    this.group = this.services.group.getOneObs;
    this.activities = this.services.activity.getListObs;

    this.config.formInputs = {
      _id: [""],
      //name: ['', [validators.required],[validators.valueExist()]],
      name: ["", [this.validators.required]],
      company: [this.config.company],
      main: [""],
      activities: [[]],
      options: [[]],
    };
  }

  loadContent() {
    return concat(
      super.loadContent(),
      this.services.activity.loadList({ company: this.config.company })
    );
  }
}
