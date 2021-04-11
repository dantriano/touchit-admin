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
  private data = new Subject<object>();
  data$ = this.data.asObservable();
  constructor(protected companyService: CompanyService) {
    super();
  }
  loadComponent() {
    this.config = config;
    this.dataTable = this.data$;
    
    this.companyService.companyData$.subscribe((data) => {
      const company: any = Object.values(data)[0];
      this.data.next(company["locations"]);
    });
  }
}
