import { Component, OnInit } from "@angular/core";
import { ListComponent } from "@views/common/list/list.component";
import { ConfigurationService } from "app/@core/services";
import { config } from "./_options";

@Component({
  selector: "options-list",
  templateUrl: "../../common/list/list.component.html",
})
export class ConfigurationsListComponent
  extends ListComponent
  implements OnInit {
  constructor(private configurationService: ConfigurationService) {
    super();
    this.services = { configuration: this.configurationService };
  }
  loadComponent() {
    this.config = config;
    this.dataTable = this.services[this.config.service].getListObs;
  }
  loadContent() {
    return super.loadContent();
  }
}
