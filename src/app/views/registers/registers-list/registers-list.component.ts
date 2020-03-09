import { Component, OnInit } from '@angular/core';
import { RegisterData } from '../../../@core/data';
import { ToastrService } from 'ngx-toastr';
import { ListComponent } from 'app/views/common/list.component';

@Component({
  selector: 'registers-list',
  templateUrl: './registers-list.component.html',
})
export class RegistersListComponent extends ListComponent implements OnInit {
  constructor(private componentService: RegisterData, public toastr: ToastrService) {
    super(toastr);
  }
  public loadComponent() {
    this.set('model', 'registers');
    this.set('service', this.componentService);
    this.set('displayedColumns', ['_id', 'options']);
  }
}
