import { Component, OnInit } from "@angular/core";
import { ListComponent } from "@views/common/list/list.component";
import { GroupService } from "app/@core/services";
import { config } from "./_options";

@Component({
  selector: "groups-list",
  templateUrl: "../../../common/list/list.component.html",
})
export class GroupsListComponent extends ListComponent implements OnInit {
  constructor(protected groupService: GroupService) {
    super();
    this.services = { group: this.groupService };
  }
  loadComponent() {
    this.config = config;
    this.dataTable = this.services[this.config.service].getListObs;
  }
  loadContent() {
    return super.loadContent();
  }
}
