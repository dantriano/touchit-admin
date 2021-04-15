import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { AuthenticationService } from "@services/authentication.service";
import { CompanyService } from "@services/company.service";

@Component({
  // tslint:disable-next-line
  selector: "body",
  template: "<router-outlet></router-outlet>",
})
export class AppComponent implements OnInit {
  constructor(
    protected companyService: CompanyService,
    protected authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) this.loadCompanyData();
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
  loadCompanyData() {
    this.authService.user && this.authService.company && this.companyService.loadData({"name": "Empresa"});
  }
}
