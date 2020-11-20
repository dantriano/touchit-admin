import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { first, tap, map } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CommonServices } from 'app/@core/utils';
import { UserModel } from 'app/@core/models';
import { UserData } from 'app/@core/data';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})

export class LoginComponent {
  form: FormGroup;
  submitted = false;
  errorsLogin: boolean;
  loading = false;
  returnUrl: string;
  error = '';
  private querySubscription: Subscription;
  constructor(private formBuilder: FormBuilder, private service: UserData, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) {
    if (this.service.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    localStorage.removeItem('currentUser')
  
    this.querySubscription = this.service.login({ email: this.f.username.value, password: this.f.password.value })
      .pipe(first())
      .subscribe(
        data => {
          const user = data.data
          localStorage.setItem('currentUser', JSON.stringify(user.login));
          this.service.currentSubject.next(user.login);
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.toastr.error(CommonServices.graphqlError(error));
          if (error.graphQLErrors.length > 0 && error.graphQLErrors[0].extensions.code == 'UNAUTHENTICATED')
            this.errorsLogin = true;
          this.loading = false;
        });
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }

}
