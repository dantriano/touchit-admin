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
    this.obs$ = this.registerService.loadList({
      company: this.authService.currentCompany,
    });
  }
  loadContent() {
    this.obs$.subscribe(({ registers }) => {
      console.log(registers);
      this.dataTable.next(registers || []);
    });
  }

  confirmDelete() {
    console.log(this.config._id);
    this.registerService.remove({ _id: this.config._id }).subscribe((data) => {
      this.loadComponent();
      console.log(data);
    });
  }
}
