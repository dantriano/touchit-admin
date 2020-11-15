import { Component, OnInit } from '@angular/core';
import { ActivityData } from './../../../@core/data/';
import { ToastrService } from 'ngx-toastr';
import { ListComponent } from 'app/views/common/list.component';

@Component({
  selector: 'activities-list',
  templateUrl: './activities-list.component.html',
})
export class ActivitiesListComponent extends ListComponent implements OnInit {
  constructor(private componentService: ActivityData, public toastr: ToastrService) {
    super(toastr);
  }
  public loadComponent() {
    this.set('model', 'activities');
    this.set('service', this.componentService);
    this.set('displayedColumns', [ 'name', 'locations','options']);

  }
}
