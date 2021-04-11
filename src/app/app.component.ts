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
    console.log(this.authService.user.currentCompany);
    this.companyService.loadData({"_id":"5e6acf4e2a94ac32a586eafa"});
  }
}
