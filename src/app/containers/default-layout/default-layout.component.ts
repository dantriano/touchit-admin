import { Component, Injectable } from "@angular/core";
import { Router, RouterStateSnapshot } from "@angular/router";
import { AuthenticationService } from "app/@core/utils";
import { navItems } from "../../_nav";

@Injectable()
@Component({
  selector: "app-dashboard",
  templateUrl: "./default-layout.component.html",
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  get user() {
    return this.authService.currentUser;
  }
  get company() {
    return this.authService.currentCompany;
  }
  set company(company) {
    this.authService.setCompany(company);
    this.router.navigate([this.router.url]);
  }
  logout() {
    this.authService.logout();
    this.router.navigate(["/"]);
  }
}
