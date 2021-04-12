import { Component } from "@angular/core";
import { ListComponent } from "@views/common/list/list.component";
import { CompanyService } from "app/@core/services";
import { Subject, Subscription } from "rxjs";
import { config } from "./_options";

@Component({
  selector: "locations-list",
  templateUrl: "../../../common/list/list.component.html",
})
export class LocationsListComponent extends ListComponent {
  constructor(protected companyService: CompanyService) {
    super(config);
  }
  loadComponent() {
    this.obs$ = this.companyService.companyData$;
  }
  loadContent() {
    this.obs$.subscribe((data) => {
      this.dataTable.next(data?.locations);
    });
  }
}
