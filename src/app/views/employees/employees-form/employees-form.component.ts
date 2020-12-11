import { Component, Injector, ViewChildren } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Employee } from "app/@core/models/employee.model";
import {
  ActivityService,
  EmployeeService,
  GroupService,
} from "app/@core/services";
import { FormComponent } from "app/common/form.component";
import { ToastrService } from "ngx-toastr";
import { EmployeesComponent } from "../employees.component";
import { Observable, BehaviorSubject, of } from "rxjs";
import { take } from "rxjs/operators";

@Component({
  selector: "employees-form",
  templateUrl: "./employees-form.component.html",
})
/**
 * Component to generate the Employee Form Page
 */
export class EmployeesFormComponent extends FormComponent {
  subscription$;
  constructor(
    public route: ActivatedRoute,
    public employeeService: EmployeeService,
    public activityService: ActivityService,
    public groupService: GroupService
  ) {
    super(null, null, null);
  }
  public employee: Observable<any>;
  public activities: Observable<any>;
  public groups: Observable<any>;
  @ViewChildren("customSelected") cs;
  loadComponent() {
    this.service = this.employeeService;
    this.config = {
      redirect: "employees",
      uiName: "Employees",
    };
    this.set("customOptions", [
      { value: "on", label: "btn btn-success", span: "fa fa-check" },
      { value: "default", label: "btn btn-secondary", span: "fa fa-circle-o" },
      { value: "off", label: "btn btn-danger", span: "fa fa-close" },
    ]);
    this.set("displayedColumns", ["status", "name", "options"]);
    this.set("formInputs", {
      _id: [""],
      options: [[]],
      customActivities: [[]],
      employeeCode: [""],
      isLinked: false,
      linkCode: [this.makeCode()],
      firstName: [, [this.validators.required]],
      lastName: [""],
      groups: [[]],
      company: [this.company],
      mainActivity: ["", [this.validators.required]],
      //email: ['', [validators.email, validators.required]],
      email: [
        "",
        [this.validators.email, this.validators.required],
        [this.validators.valueExist()],
      ],
    });
    this.employee = this.employeeService.employee;
    this.activities = this.activityService.activities;
    this.groups = this.groupService.groups;
  }

  loadContent() {
    const variables = { company: this.company };
    this.obs$ = this.employeeService.getOne({
      _id: this._id,
      company: this.company,
    });
    this.activityService.getList(variables);
    this.groupService.getList(variables);
    this.subscription$ = this.employee.subscribe((x) => {
      this.formData.next(x);
    });
  }
  /**
   * Generate a new random Code
   */
  makeCode() {
    //return this.service.generateCode();
  }
  ngOnDestroy() {
    this.subscription$.unsubscribe();
    this.employeeService.set(null);
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
    return this.find(this.form.value.customActivities, id).status || "default";
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
  getCustomStatus(id, userCustomActivities, userGroups) {
    var customStatus = this.find(userCustomActivities, id).status || "default";
    var activitiesByGroup = false;
    /*this.formData.groups
       .filter((item) => userGroups.includes(item._id))
       .filter((item) => item.activities.includes(id))
       .forEach(function (item) {
         activitiesByGroup = true;
       }, activitiesByGroup);*/
    return (
      (customStatus === "on" || activitiesByGroup) && !(customStatus === "off")
    );
  }
}
