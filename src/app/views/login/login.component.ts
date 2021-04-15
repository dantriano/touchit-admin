import { Component, Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  Router,
  ActivatedRoute,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { AuthenticationService } from "app/@core/services/authentication.service";
import { User } from "@models/user.model";

@Component({
  selector: "app-dashboard",
  templateUrl: "login.component.html",
})
@Injectable()
export class LoginComponent {
  form: FormGroup;
  submitted = false;
  errorsLogin: boolean;
  loading = false;
  returnUrl: string;
  error = "";
  protected currentUser: any = {};
  msg: any = {
    error: {
      ups: "Ups..Something happend",
    },
  };
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
    this.returnUrl =
      this.route.snapshot.queryParams["returnUrl"] || "/dashboard";
  }
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.authService.attemptAuth(this.form.value).subscribe(this.onLogin);
  }
  onLogin: any = {
    next: (data) => {
      if (data && data.login && data.login.token) {
        let user = new User().deserialize(data.login);
        this.authService.setAuth(user);
        this.router.navigate([this.returnUrl]);
      } else this.toastr.error("Login error");
      return;
    },
  };
}
