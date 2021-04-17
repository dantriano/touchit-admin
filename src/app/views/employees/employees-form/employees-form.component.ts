import { Component, ViewChildren } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CompanyService } from "app/@core/services";
import { FormComponent } from "@views/common/form/form.component";
import { config } from "./_options";
import { getCustomStatus } from "../employees";
import { addOrReplace, find, genID } from "@utils/commons.service";
import { first } from "rxjs/operators";

@Component({
  selector: "employees-form",
  templateUrl: "./employees-form.component.html",
})
/**
 * Component to generate the Employee Form Page
 */
export class EmployeesFormComponent extends FormComponent {
  public getCustomStatus = getCustomStatus;
  public activities: any[];
  public groups: any[];
  @ViewChildren("customSelected") cs;

  constructor(
    public activatedRoute: ActivatedRoute,
    public companyService: CompanyService
  ) {
    super(activatedRoute, config);
  }
  /**
   * Load the component elements and configuration
   */
  loadComponent() {
    this.config.formInputs = {
      _id: genID(),
      userID: [""],
      options: [[]],
      customActivities: [[]],
      employeeCode: [""],
      isLinked: false,
      linkCode: [this.makeCode()],
      firstName: [, [this.validators.required]],
      lastName: [""],
      groups: [[]],
      company: [this.authService.currentCompany],
      mainActivity: [, [this.validators.required]],
      //email: ['', [validators.email, validators.required]],
      email: [
        "",
        [this.validators.email, this.validators.required],
        //[this.validators.valueExist()],
      ],
    };
  }
  loadContent() {
    this.companyService.companyData$.pipe(first()).subscribe((data) => {
      this.activities = data.activities;
      this.groups = data.groups;
      let formData = find(data?.employees, this.config._id);
      this.obs.next(formData);
    });
  }
  saveForm() {
    this.companyService
      .loadData(this.authService.currentCompany)
      .pipe(first())
      .subscribe((company) => {
        company.employees = addOrReplace(company.employees, [this.form.value]);
        console.log(company.employees);
        this.companyService.save(company).subscribe(this.submitObserver);
      });
  }
  /**
   * Generate a new random Code
   */
  makeCode() {
    return this.companyService.generateEmployeeCode();
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
