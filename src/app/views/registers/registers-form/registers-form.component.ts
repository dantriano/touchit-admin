import { Component, ViewChildren } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormComponent } from "@views/common/form/form.component";
import { Observable, zip } from "rxjs";
import { config } from "./_options";
import { CompanyService, RegisterService } from "app/@core/services";
import { FormControl } from "@angular/forms";
import { find, first } from "rxjs/operators";

@Component({
  selector: "register-form",
  templateUrl: "./registers-form.component.html",
})
/**
 * Component to generate the Registers Form Page
 */
export class RegistersFormComponent extends FormComponent {
  protected filteredEmployees: Observable<any[]>;
  private position = { lat: 0, lng: 0 };
  public register: Observable<any>;
  public activities: any[];
  public employees: any[];

  @ViewChildren("customSelected") cs;
  protected employeeName: FormControl = new FormControl();

  constructor(
    public activatedRoute: ActivatedRoute,
    public registerService: RegisterService,
    public companyService: CompanyService
  ) {
    super(activatedRoute, config);
  }
  /**
   * Load the component elements and configuration
   */
  loadComponent() {
    this.getLocation();
    this.config.formInputs = {
      _id: [],
      company: [this.config.company],
      employee: [, this.validators.required],
      activity: [, this.validators.required],
      start: [new Date()],
      end: [new Date()],
      delay: [123],
      inPosition: true,
      location: this.position,
    };
  }

  loadContent() {
    this.companyService.companyData$.pipe(first()).subscribe((data) => {
      this.activities = data.activities;
      this.employees = data.employees;
      this.employeeAutocomplete();
    });
    this.registerService
      .loadOne({
        company: this.authService.currentCompany,
        _id: this.config._id,
      })
      .subscribe(({ register }) => {
        this.obs.next(register || {});
        //this.employeeName.setValue("ups");
      });
  }
  saveForm() {
    this.registerService
      .save(this.form.value)
      .subscribe(this.submitObserver);
  }
  getLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.position.lat = position.coords.latitude;
      this.position.lng = position.coords.longitude;
      this.f.location.setValue(this.position);
    });
  }

  employeeAutocomplete() {
    this.filteredEmployees = this.loadAutocomplete(
      this.employees,
      this.employeeName,
      ["firstName", "lastName"]
    );
  }
}
