import { Component, OnInit } from "@angular/core";
import { ListComponent } from "@views/common/list/list.component";
import { ScheduleService } from "app/@core/services";
import { config } from "./_options";

@Component({
  selector: "schedules-list",
  templateUrl: "../../../common/list/list.component.html",
})
export class SchedulesListComponent extends ListComponent implements OnInit {
  constructor(protected scheduleService: ScheduleService) {
    super();
    this.services = { schedule: this.scheduleService };
  }
  loadComponent() {
    this.config = config;
    this.dataTable = this.services[this.config.service].getListObs;
  }
  loadContent() {
    return super.loadContent();
  }
}
