import { Component, OnInit } from "@angular/core";
import { ListComponent } from "app/common/list.component";
import { RegisterService } from "app/@core/services";
import { config } from "./_options";

@Component({
  //selector: "list-columns",
  templateUrl: "../../../common/views/list.component.html",
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
