import { Component, OnInit } from "@angular/core";
import { ListComponent } from "@views/common/list/list.component";
import { ActivityService, CompanyService } from "app/@core/services";
import { config } from "./_options";

@Component({
  selector: "activities-list",
  templateUrl: "../../../common/list/list.component.html",
})
export class ActivitiesListComponent extends ListComponent implements OnInit {
  constructor(protected companyService: CompanyService) {
    super(config);
  }
  loadComponent() {
    this.obs$ = this.companyService.companyData$;
  }
  loadContent() {
    this.obs$.subscribe((data) => {
      this.dataTable.next(data?.activities);
    });
  }
}
