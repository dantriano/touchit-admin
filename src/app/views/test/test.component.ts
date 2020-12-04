import { Component } from '@angular/core';
import { UserData } from 'app/@core/data';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
    selector: 'app-test',
    templateUrl: 'test.component.html'
})
export class TestComponent {

  protected subscription: Subscription;
  constructor(private service: UserData,public toastr: ToastrService) {}
  ngOnInit() {
    this.toastr.error("hola");
    var input={ email:'dan@dan.es', password: '1234' };
    this.subscription = this.service.login(input)
      .pipe(first())
      .subscribe(
        data => {
         console.log(data)
        },
        error => {
          console.log(error)
        });
  }
}