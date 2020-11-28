import { Component, OnInit } from '@angular/core';
import { LocationData } from 'app/@core/data/';
import { ToastrService } from 'ngx-toastr';
import { ListComponent } from 'app/views/common/list.component';

@Component({
  selector: 'locations-list',
  templateUrl: './locations-list.component.html',
})
export class LocationsListComponent extends ListComponent implements OnInit {
  constructor(private componentService: LocationData, public toastr: ToastrService) {
    super(toastr);
  }
  public loadComponent() {
    this.set('model', 'locations');
    this.set('service', this.componentService);
    this.set('displayedColumns', [ 'name', 'options']);
  }
}
