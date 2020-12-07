import { Component, OnInit } from "@angular/core";
import { RegisterData } from "app/@core/data";
import { ToastrService } from "ngx-toastr";
import { ListComponent } from "app/common/list.component";
import { AuthenticationService } from "app/@core/utils";

@Component({
  selector: "options-list",
  templateUrl: "./options-list.component.html",
})
export class ConfigurationsListComponent
  extends ListComponent
  implements OnInit {
  constructor(
    private componentService: RegisterData,
    public toastr: ToastrService,
    public authService: AuthenticationService
  ) {
    super(toastr, authService);
  }
  public loadComponent() {
    this.set("model", "configurations");
    this.set("service", this.componentService);
    this.set("displayedColumns", [
      "employee",
      "activity",
      "time",
      "position",
      "delay",
      "options",
    ]);
  }
}
