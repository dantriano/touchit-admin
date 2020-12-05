import {Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/@core/utils';
import { navItems } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;
  constructor(private authService: AuthenticationService,private router: Router) {}

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  get user(){
    return this.authService.currentUserSubject.getValue();
  }
  get company(){
    return this.authService.company;
  }
  set company(company){
    this.authService.setCompany(company);
  }
  logout() {
    this.authService.logout()
    this.router.navigate(['/']);
  }
}
