import { Component, OnInit } from '@angular/core';
import { LocationData } from 'app/@core/data/';
import { ToastrService } from 'ngx-toastr';
import { ListComponent } from 'app/common/list.component';

@Component({
  selector: 'locations-list',
  templateUrl: './locations-list.component.html',
})
export class LocationsListComponent extends ListComponent implements OnInit {
  protected model:string = 'locations';
  constructor(protected service: LocationData, public toastr: ToastrService) {
    super(toastr);
  }
  public loadComponent() {
    this.set('displayedColumns', [ 'name', 'options']);
  }
}
