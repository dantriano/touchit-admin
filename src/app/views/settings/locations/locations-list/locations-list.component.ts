import { Component } from "@angular/core";
import { ListComponent } from "@views/common/list/list.component";
import { CompanyService } from "app/@core/services";
import { Subject, Subscription } from "rxjs";
import { config } from "./_options";
import { remove } from "@utils/commons.service";
import { first } from "rxjs/operators";

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

  confirmDelete() {
    this.companyService
      .loadData(this.authService.currentCompany)
      .pipe(first())
      .subscribe((company) => {
        company.locations = remove(company?.locations, this.config._id);
        this.companyService.save(company).subscribe(({ data }) => {
          if (data.saveCompany) this.dataTable.next(company.locations);
        });
      });
  }
}
