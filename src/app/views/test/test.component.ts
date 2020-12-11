import { Component } from '@angular/core';
import { UserService } from 'app/@core/services';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
    selector: 'app-test',
    templateUrl: 'test.component.html'
})
export class TestComponent {

  protected subscription: Subscription;
  constructor(private service: UserService,public toastr: ToastrService) {}
  ngOnInit() {
    this.toastr.error("hola");
    
  }
}