import { Component, OnInit } from "@angular/core";
import { ListComponent } from "@views/common/list/list.component";
import { RegisterService } from "app/@core/services";
import { config } from "./_options";

@Component({
  templateUrl: "../../common/list/list.component.html",
})
export class RegistersListComponent extends ListComponent implements OnInit {
  constructor(protected registerService: RegisterService) {
    super();
    this.services = { register: this.registerService };
  }
  loadComponent() {
    this.config = config;
    this.dataTable = this.services[this.config.service].getListObs;
  }
  loadContent() {
    return super.loadContent();
  }
}
