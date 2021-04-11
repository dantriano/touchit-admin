import { Component, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'app/@core/services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
@Injectable()
export class LoginComponent{
  form: FormGroup;
  submitted = false;
  errorsLogin: boolean;
  loading = false;
  returnUrl: string;
  error = '';
  protected currentUser:any = {};
  private auth: Subscription;

  msg: any = {
    error: {
      'ups': 'Ups..Something happend'
    }
  }
  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) {}
  
  ngOnInit() {
    this.form = this.formBuilder.group({
      username: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    this.auth = this.authService.currentUser.subscribe(
      data => {
        if(data) 
          this.router.navigate([this.returnUrl]);
        if(data==null)
          this.toastr.error("error");   
        return;
    })
  }
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.authService.attemptAuth(this.form.value);
  }

  ngOnDestroy() {
    this.auth?.unsubscribe();
  }

}
