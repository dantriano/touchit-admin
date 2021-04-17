import { Component, ViewChildren } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormComponent } from "@views/common/form/form.component";
import { Observable, zip } from "rxjs";
import { config } from "./_options";
import {
  EmployeeService,
  RegisterService,
} from "app/@core/services";
import { FormControl } from "@angular/forms";

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
  public activities: Observable<any>;
  public employees: Observable<any>;

  @ViewChildren("customSelected") cs;
  protected employeeName: FormControl = new FormControl();

  constructor(
    public activatedRoute: ActivatedRoute,
    public registerService: RegisterService,
    public employeeService: EmployeeService
  ) {
    super(activatedRoute);
    this.services = {
      register: this.registerService,
      employee: this.employeeService,
    };
  }
  /**
   * Load the component elements and configuration
   */
  loadComponent() {
    this.config = config;
    this.register = this.services.register.getOneObs;
    this.activities = this.services.activity.getListObs;
    this.employees = this.services.employee.getListObs;

    this.getLocation();
    this.employeeAutocomplete();

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
    return zip(
      this.services[this.config.service].loadOne(this.config.query),
      this.services.activity.loadList({ company: this.config.company }),
      this.services.employee.loadList({ company: this.config.company })
    );
  }
  getLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.position.lat = position.coords.latitude;
      this.position.lng = position.coords.longitude;
      this.f.location.setValue(this.position);
    });
  }

  employeeAutocomplete() {
    this.subscriptions.push(
      this.employees.subscribe((data) => {
        this.filteredEmployees = this.loadAutocomplete(
          this.services.employee.getList,
          this.employeeName,
          ["firstName", "lastName"]
        );
        this.employeeName.setValue(data.register?._employee.firstName);
      })
    );
  }
}
