import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { ListComponent } from "app/common/list.component";
import { AuthenticationService } from "app/@core/utils";
import { ConfigurationService } from "app/@core/services";

@Component({
  selector: "options-list",
  templateUrl: "./options-list.component.html",
})
export class ConfigurationsListComponent
  extends ListComponent
  implements OnInit {
  constructor(
    private componentService: ConfigurationService,
    public toastr: ToastrService,
    public authService: AuthenticationService
  ) {
    super(toastr, authService);
  }
  public loadComponent() {
    this.set("model", "configurations");
    this.set("service", this.componentService);
    this.set("displayedColumns", [
      "id",
      "desc",
      //"companies",
      "status",
      "options",
    ]);
  }
}
