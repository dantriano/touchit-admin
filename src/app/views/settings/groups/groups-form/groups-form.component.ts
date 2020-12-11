import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { FormComponent } from "app/common/form.component";
import { AuthenticationService } from "app/@core/utils";
import { GroupService } from "app/@core/services";

@Component({
  selector: "groups-form",
  templateUrl: "./groups-form.component.html",
})
export class GroupsFormComponent extends FormComponent {
  protected model: string = "group";
  constructor(
    public service: GroupService,
    public route: ActivatedRoute,
    public router: Router,
    public toastr: ToastrService,
    public authService: AuthenticationService
  ) {
    super(route, router, toastr);
  }
  public loadComponent() {
    this.company = this.authService.company._id;
    this.config = { redirect: "settings", uiName: "Groups" };
    this.set("formInputs", {
      _id: [""],
      //name: ['', [validators.required],[validators.valueExist()]],
      name: ["", [this.validators.required]],
      company: [this.company],
      main: [""],
      activities: [[]],
      options: [[]],
    });
  }
}
