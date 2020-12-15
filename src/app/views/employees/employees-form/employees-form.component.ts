import { Component, ViewChildren } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  ActivityService,
  EmployeeService,
  GroupService,
} from "app/@core/services";
import { FormComponent } from "@views/common/form/form.component";
import { Observable, zip } from "rxjs";
import { config } from "./_options";
import { getCustomStatus } from "../employees";
import { find } from "@utils/commons.service";

@Component({
  selector: "employees-form",
  templateUrl: "./employees-form.component.html",
})
/**
 * Component to generate the Employee Form Page
 */
export class EmployeesFormComponent extends FormComponent {
  public getCustomStatus = getCustomStatus;
  public employee: Observable<any>;
  public activities: Observable<any>;
  public groups: Observable<any>;
  @ViewChildren("customSelected") cs;

  constructor(
    public activatedRoute: ActivatedRoute,
    public employeeService: EmployeeService,
    public activityService: ActivityService,
    public groupService: GroupService
  ) {
    super(activatedRoute);
    this.services = {
      employee: this.employeeService,
      activity: this.activityService,
      group: this.groupService,
    };
  }
  /**
   * Load the component elements and configuration
   */
  loadComponent() {
    this.config = config;
    this.employee = this.services.employee.getOneObs;
    this.activities = this.services.activity.getListObs;
    this.groups = this.services.group.getListObs;

    this.config.formInputs = {
      _id: [""],
      options: [[]],
      customActivities: [[]],
      employeeCode: [""],
      isLinked: false,
      linkCode: [this.makeCode()],
      firstName: [, [this.validators.required]],
      lastName: [""],
      groups: [[]],
      company: [this.config.company],
      mainActivity: [, [this.validators.required]],
      //email: ['', [validators.email, validators.required]],
      email: [
        "",
        [this.validators.email, this.validators.required],
        [this.validators.valueExist()],
      ],
    };
  }

  loadContent() {
    return zip(
      this.services[this.config.service].loadOne(this.config.query),
      this.services.activity.loadList({ company: this.config.company }),
      this.services.group.loadList({ company: this.config.company })
    );
  }
  /**
   * Generate a new random Code
   */
  makeCode() {
    return this.services.employee.generateCode();
  }
  /**
   * Change the service option for the current user: on, off, default
   */
  setCustomOption() {
    var selectedOptions = this.cs._results
      .filter((item) => item.nativeElement.checked)
      .map((item) => ({
        _id: item.nativeElement.getAttribute("custom-id"),
        status: item.nativeElement.value,
      }));
    this.form.controls.customActivities.setValue(selectedOptions);
  }

  /**
   * Returns the stored custom option for the user to the service given
   * @param id Service ID
   */
  getCustomOption(id) {
    return find(this.form.value.customActivities, id).status || "default";
  }

  /**
   * Apply to the form the groups un/selected for the user
   * @param list List of groups
   */
  groupSelected(list) {
    var selectedOptions = list.selectedOptions.selected.map(
      (item) => item.value
    );
    this.form.controls.groups.setValue(selectedOptions);
  }
}
