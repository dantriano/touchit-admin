import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { ListComponent } from "app/common/list.component";
import { AuthenticationService } from "app/@core/utils";
import { LocationService } from "app/@core/services";

@Component({
  selector: "locations-list",
  templateUrl: "./locations-list.component.html",
})
export class LocationsListComponent extends ListComponent implements OnInit {
  protected model: string = "locations";
  constructor(
    protected service: LocationService,
    public toastr: ToastrService,
    public authService: AuthenticationService
  ) {
    super(toastr, authService);
  }
  public loadComponent() {
    this.set("displayedColumns", ["name", "options"]);
  }
}
