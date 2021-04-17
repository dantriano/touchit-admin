import { Injectable } from "@angular/core";
import { UserService } from "app/@core/services/user.service";
import { User } from "app/@core/models";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  private user: User;
  private company: string = null;
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

  set localCompany(company) {
    localStorage.setItem("currentCompany", JSON.stringify(company));
  }
  get localCompany() {
    return (
      localStorage.getItem("currentCompany") &&
      JSON.parse(localStorage.getItem("currentCompany"))
    );
  }
  get isAuthenticated() {
    return this.auth;
  }
  get currentUser() {
    return this.user;
  }
  set currentCompany(company) {
    this.company = company;
  }
  get currentCompany() {
    return this.company;
  }
  hasUserAuth() {
    return localStorage.getItem("currentUser") != null;
  }
  getUser() {
    return this.userService.getOneObs;
  }
  setAuth(user: User) {
    this.user = user;
    this.localUser = user;
    localStorage.setItem('token',user.token);
    if (this.localCompany) this.setCompany(this.localCompany);
    else if (this.user.companies.length != 0)
      this.setCompany(this.user.companies[0]);
    this.auth = true;
  }
  setCompany(company) {
    this.currentCompany = company;
    this.localCompany = company;
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
