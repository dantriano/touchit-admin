import { Component, OnInit } from '@angular/core';
import { RegisterData } from 'app/@core/data';
import { ToastrService } from 'ngx-toastr';
import { ListComponent } from 'app/common/list.component';
import { AuthenticationService } from 'app/@core/utils';

@Component({
  selector: 'registers-list',
  templateUrl: './registers-list.component.html',
})
export class RegistersListComponent extends ListComponent implements OnInit {
  constructor(private componentService: RegisterData, public toastr: ToastrService,public authService: AuthenticationService) {
    super(toastr,authService);
  }
  public loadComponent() {
    this.set('model', 'registers');
    this.set('service', this.componentService);
    this.set('displayedColumns', ['_id', 'options']);
  }
}
