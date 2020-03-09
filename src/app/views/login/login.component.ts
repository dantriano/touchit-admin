import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthenticationService } from '../../@core/utils/authentication.service';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { commonsService } from 'app/@core/utils';

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
  constructor(private formBuilder: FormBuilder, private service: AuthenticationService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) {
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
  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.querySubscription = this.service.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.toastr.error(commonsService.graphqlError(error));
          if (error.graphQLErrors.length > 0 && error.graphQLErrors[0].extensions.code == 'UNAUTHENTICATED')
            this.errorsLogin = true;
          this.loading = false;
        });
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }

}
