import { Component, OnInit } from "@angular/core";
import { ListComponent } from "@views/common/list/list.component";
import { LocationService } from "app/@core/services";
import { config } from "./_options";

@Component({
  selector: "locations-list",
  templateUrl: "../../../common/list/list.component.html",
})
export class LocationsListComponent extends ListComponent implements OnInit {
  constructor(protected locationService: LocationService) {
    super();
    this.services = { location: this.locationService };
  }
  loadComponent() {
    this.config = config;
    this.dataTable = this.services[this.config.service].getListObs;
  }
  loadContent() {
    return super.loadContent();
  }
}
