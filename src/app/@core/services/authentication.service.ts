import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { UserService } from "app/@core/services/user.service";
import { User } from "app/@core/models";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  currentUserSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  currentUser: Observable<User> = this.currentUserSubject.asObservable();

  constructor(private userService: UserService) {
    if (this.isAuthenticated) {
      this.setAuth(JSON.parse(localStorage.getItem("currentUser")));
    }
    if (!this.isAuthenticated) {
      this.userService.getOneObs.subscribe(
        (user) => {
          if (user) {
            this.setAuth(user);
          } else {
            this.logout();
          }
        },
        (error) => {
          this.logout();
          return;
          return throwError("Error");
        }
      );
    }
  }
  set isAuthenticated(is: boolean) {
    localStorage.setItem("isAuthenticated", JSON.stringify(is));
  }
  set user(user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
  }
  set company(company) {
    localStorage.setItem("currentCompany", JSON.stringify(company));
  }
  get isAuthenticated(): boolean {
    return localStorage.getItem("isAuthenticated") == "true";
  }
  get user() {
    return localStorage.getItem("currentUser")
      ? new User().deserialize(JSON.parse(localStorage.getItem("currentUser")))
      : null;
  }
  get company() {
    return JSON.parse(localStorage.getItem("currentCompany"));
  }
  getUser() {
    return this.userService.getOneObs;
  }
  setAuth(user: User) {
    this.user = user;
    this.company = this.company
      ? this.company
      : user._company.length > 0
      ? user._company[0]
      : null;
    this.currentUserSubject.next(user);
    this.isAuthenticated = true;
  }
  attemptAuth(credentials) {
    this.userService.getOne({
      email: credentials.username,
      password: credentials.password,
    });
  }

  logout() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentCompany");
    localStorage.removeItem("isAuthenticated");
    this.currentUserSubject.next(null);
    this.isAuthenticated = false;
  }
}
