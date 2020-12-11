import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { ListComponent } from "app/common/list.component";
import { AuthenticationService } from "app/@core/utils";
import { ActivityService } from "app/@core/services";

@Component({
  selector: "activities-list",
  templateUrl: "./activities-list.component.html",
})
export class ActivitiesListComponent extends ListComponent implements OnInit {
  protected model: string = "activities";
  constructor(
    protected service: ActivityService,
    public toastr: ToastrService,
    public authService: AuthenticationService
  ) {
    super(toastr, authService);
  }
  public loadComponent() {
    this.set("displayedColumns", ["name", "locations", "options"]);
  }
}
