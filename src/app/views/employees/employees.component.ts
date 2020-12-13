import { Component } from "@angular/core";
import { find } from "@utils/commons.service";

@Component({
  selector: "ngx-registers",
  template:
    "<lib-breadcrumbs></lib-breadcrumbs><router-outlet></router-outlet>",
})
export class RegistersComponent {
  
  static getCustomStatus(id, userCustomActivities, userGroups, companyGroups) {
    var customStatus = find(userCustomActivities, id).status || "default";
    var activitiesByGroup = false;
    companyGroups
      ?.filter((item) => userGroups.includes(item._id))
      .filter((item) => item.activities.includes(id))
      .forEach(function (item) {
        activitiesByGroup = true;
      }, activitiesByGroup);
    return (
      (customStatus === "on" || activitiesByGroup) && !(customStatus === "off")
    );
  }
}
