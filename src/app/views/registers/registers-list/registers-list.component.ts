import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { ListComponent } from "app/common/list.component";
import { AuthenticationService } from "app/@core/utils";
import { RegisterService } from "app/@core/services";

@Component({
  selector: "registers-list",
  templateUrl: "./registers-list.component.html",
})
export class RegistersListComponent extends ListComponent implements OnInit {
  constructor(
    private componentService: RegisterService,
    public toastr: ToastrService,
    public authService: AuthenticationService
  ) {
    super(toastr, authService);
  }
  public loadComponent() {
    this.set("model", "registers");
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
