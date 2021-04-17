import { Component, OnInit } from "@angular/core";
import { ListComponent } from "@views/common/list/list.component";
import { CompanyService, RegisterService } from "app/@core/services";
import { first } from "rxjs/operators";
import { config } from "./_options";

@Component({
  templateUrl: "../../common/list/list.component.html",
})
export class RegistersListComponent extends ListComponent implements OnInit {
  constructor(
    protected registerService: RegisterService,
    protected companyService: CompanyService
  ) {
    super(config);
  }
  loadComponent() {
    console.log(this.authService.currentCompany)
    this.obs$ = this.registerService.loadList({
      company: this.authService.currentCompany,
    });
  }
  loadContent() {
    this.obs$.subscribe(({ registers }) => {
      console.log(registers)
      this.dataTable.next(registers || []);
    });
  }

  confirmDelete() {
    /*this.companyService
      .loadData(this.authService.currentCompany)
      .pipe(first())
      .subscribe((company) => {
        company.activities = remove(company?.activities, this.config._id);
        this.companyService.save(company).subscribe(({ data }) => {
          if (data.saveCompany) this.dataTable.next(company.activities);
        });
      });*/
  }
}
