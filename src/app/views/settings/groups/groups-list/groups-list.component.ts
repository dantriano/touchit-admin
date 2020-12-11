import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { ListComponent } from "app/common/list.component";
import { AuthenticationService } from "app/@core/utils";
import { GroupService } from "app/@core/services";

@Component({
  selector: "groups-list",
  templateUrl: "./groups-list.component.html",
})
export class GroupsListComponent extends ListComponent implements OnInit {
  protected model: string = "groups";
  constructor(
    protected service: GroupService,
    public toastr: ToastrService,
    public authService: AuthenticationService
  ) {
    super(toastr, authService);
  }
  public loadComponent() {
    this.set("displayedColumns", [
      /*'id',*/ "name",
      "activities",
      /*'status', */ "options",
    ]);
  }
}
