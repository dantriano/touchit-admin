import { Component, OnInit } from '@angular/core';
import { ActivityData } from 'app/@core/data/';
import { ToastrService } from 'ngx-toastr';
import { ListComponent } from 'app/common/list.component';
import { AuthenticationService } from 'app/@core/utils';

@Component({
  selector: 'activities-list',
  templateUrl: './activities-list.component.html',
})
export class ActivitiesListComponent extends ListComponent implements OnInit {
  protected model:string = 'activities';
  constructor(protected service: ActivityData, public toastr: ToastrService,public authService: AuthenticationService ) {
    super(toastr,authService);
  }
  public loadComponent() {
    this.set('displayedColumns', [ 'name', 'locations','options']);

  }
}
