import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { FormComponent } from "app/common/form.component";
import { AuthenticationService } from "app/@core/utils";
import { EmployeeService } from "app/@core/services";

@Component({
  selector: "ngx-employees",
  template: `<lib-breadcrumbs></lib-breadcrumbs
    ><router-outlet></router-outlet>`,
})
export class EmployeesComponent extends FormComponent {
  protected model: string = "employee";
  constructor(
    public service: EmployeeService,
    public route: ActivatedRoute,
    public router: Router,
    public toastr: ToastrService,
    public authService: AuthenticationService
  ) {
    super(route, router, toastr);
  }

  loadComponent() {
    this.config = { redirect: "employees" };
  }

  /**
   * Foreach available service returns its status for the current users depending on his group and custom option
   * @param id Service ID
   * @param userCustomActivities List of the status of all the activities for the current user
   * @param userGroups List of all the user's groups
   */
  getCustomStatus(id, userCustomActivities, userGroups) {
   /* var customStatus = this.find(userCustomActivities, id).status || "default";
    var activitiesByGroup = false;
    this.formData.groups
      .filter((item) => userGroups.includes(item._id))
      .filter((item) => item.activities.includes(id))
      .forEach(function (item) {
        activitiesByGroup = true;
      }, activitiesByGroup);
    return (
      (customStatus === "on" || activitiesByGroup) && !(customStatus === "off")
    );*/
  }
}
