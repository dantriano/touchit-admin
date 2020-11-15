import { Component, OnInit } from '@angular/core';
import { GroupData } from './../../../@core/data/';
import { ToastrService } from 'ngx-toastr';
import { ListComponent } from 'app/views/common/list.component';

@Component({
  selector: 'groups-list',
  templateUrl: './groups-list.component.html',
})
export class GroupsListComponent extends ListComponent implements OnInit {
  constructor(private componentService: GroupData, public toastr: ToastrService) {
    super(toastr);
  }
  public loadComponent() {
    this.set('model', 'groups');
    this.set('service', this.componentService);
    this.set('displayedColumns', [/*'id',*/ 'name','activities', /*'status', */'options']);
  }
}
