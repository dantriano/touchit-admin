import { Injectable } from "@angular/core";
import { UserService } from "app/@core/services/user.service";
import { User } from "app/@core/models";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  private user: User;
  private auth: boolean = false;
  constructor(private userService: UserService) {
    if (this.localUser) this.setAuth(this.localUser);
  }
  set localUser(user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
  }
  get localUser() {
    return (
      localStorage.getItem("currentUser") &&
      new User().deserialize(JSON.parse(localStorage.getItem("currentUser")))
    );
  }

  get isAuthenticated() {
    return this.auth;
  }
  get currentUser() {
    return this.user;
  }
  set company(company) {
    localStorage.setItem("currentCompany", JSON.stringify(company));
  }
  get company() {
    return JSON.parse(localStorage.getItem("currentCompany"));
  }
  hasUserAuth() {
    return localStorage.getItem("currentUser") != null;
  }
  getUser() {
    return this.userService.getOneObs;
  }
  setAuth(user: User) {
    this.user = user;
    this.localUser=user;
    this.company =
      this.company && user.companies.length > 0 ? this.company[0] : null;
    this.auth = true;
  }
  attemptAuth(credentials) {
    return this.userService.login({
      email: credentials.username,
      password: credentials.password,
    });
  }
  logout() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentCompany");
    localStorage.removeItem("isAuthenticated");
    this.auth = false;
  }
}
