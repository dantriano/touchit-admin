import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { map ,  take } from 'rxjs/operators';
import { UsersService } from './@core/mock/users.service';
import { UsersData } from './@core/data/users';

@Injectable()
export class NoAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UsersData
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return true;
   // return this.userService.isAuthenticated;

  }
}