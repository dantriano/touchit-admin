import { Component, OnInit } from '@angular/core';
import { GroupData } from 'app/@core/data/';
import { ToastrService } from 'ngx-toastr';
import { ListComponent } from 'app/common/list.component';
import { AuthenticationService } from 'app/@core/utils';

@Component({
  selector: 'groups-list',
  templateUrl: './groups-list.component.html',
})
export class GroupsListComponent extends ListComponent implements OnInit {
  protected model:string = 'groups';
  constructor(protected service: GroupData, public toastr: ToastrService,public authService: AuthenticationService ) {
    super(toastr,authService);
  }
  public loadComponent() {
    this.set('displayedColumns', [/*'id',*/ 'name','activities', /*'status', */'options']);
  }
}
