import { Component, OnInit } from "@angular/core";
import { remove } from "@utils/commons.service";
import { ListComponent } from "@views/common/list/list.component";
import { CompanyService } from "app/@core/services";
import { first } from "rxjs/operators";
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
  confirmDelete() {
    this.companyService
      .loadData(this.authService.currentCompany)
      .pipe(first())
      .subscribe((company) => {
        company.activities = remove(company?.activities, this.config._id);
        this.companyService.save(company).subscribe(({ data }) => {
          if (data.saveCompany) this.dataTable.next(company.activities);
        });
      });
  }
}
