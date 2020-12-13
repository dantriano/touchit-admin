import { Component, OnInit } from "@angular/core";
import { ListComponent } from "@views/common/list/list.component";
import { ActivityService } from "app/@core/services";
import { config } from "./_options";

@Component({
  selector: "activities-list",
  templateUrl: "../../../common/list/list.component.html",
})
export class ActivitiesListComponent extends ListComponent implements OnInit {
  constructor(protected activityService: ActivityService) {
    super();
    this.services = { activity: this.activityService };
  }
  loadComponent() {
    this.config = config;
    this.dataTable = this.services[this.config.service].getListObs;
  }
  loadContent() {
    return super.loadContent();
  }
}
