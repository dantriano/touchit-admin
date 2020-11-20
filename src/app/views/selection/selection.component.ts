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
  templateUrl: 'selection.component.html'
})

export class SelectionComponent {
  public obs$: Observable<any>;
  private querySubscription: Subscription;

  loading = false;
  returnUrl: string = '/dashboard';
  error = '';
  constructor(private service: UserData, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) {
  }

  ngOnInit() {
    let currentUser = this.service.currentUserValue
    this.obs$ = this.service.getOne({ _id: currentUser._id }).pipe(map(res => {

      let data = res['data']
      return data
    }, (error) => {
      this.toastr.error(CommonServices.graphqlError(error));
      if (error.graphQLErrors.length > 0 && error.graphQLErrors[0].extensions.code == 'UNAUTHENTICATED')
        this.loading = false;
    }));
    
  }
  selectCompany(company) {
    this.querySubscription = this.service.token({ _id: '5e48a86d13fa17500da14f74' })
    .subscribe(
      data => {
        debugger

    // localStorage.setItem('currentCompany', JSON.stringify(company));
    //this.router.navigate([this.returnUrl]);        return data
      })
  }

  ngOnDestroy() {
    if (this.querySubscription) this.querySubscription.unsubscribe();
  }

}
