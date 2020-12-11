import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { FormComponent } from "app/common/form.component";
import { Observable } from "rxjs";
import { FormControl } from "@angular/forms";
import { AuthenticationService } from "app/@core/utils";
import { RegisterService } from "app/@core/services";

@Component({
  selector: "registers-form",
  templateUrl: "./registers-form.component.html",
})
export class RegistersFormComponent extends FormComponent {
  protected model: string = "register";
  protected position = { lat: 0, lng: 0 };
  protected filteredEmployees: Observable<any[]>;
  protected employeeName: FormControl = new FormControl();
  constructor(
    public service: RegisterService,
    public route: ActivatedRoute,
    public router: Router,
    public toastr: ToastrService,
    public authService: AuthenticationService
  ) {
    super(route, router, toastr);
  }
  loadComponent() {
    this.company = this.authService.company._id;
    navigator.geolocation.getCurrentPosition((position) => {
      this.position.lat = position.coords.latitude;
      this.position.lng = position.coords.longitude;
      this.f.location.setValue(this.position);
    });
    console.log(this.position);
    this.config = { redirect: "registers" };
    this.set("formInputs", {
      _id: [""],
      company: [this.company],
      employee: ["", this.validators.required],
      activity: ["", this.validators.required],
      start: [new Date()],
      end: [new Date()],
      delay: [123],
      inPosition: true,
      location: this.position,
    });
    this.onLoadContent.subscribe((data) => {
      this.filteredEmployees = this.loadAutocomplete(
        data.employees,
        this.employeeName,
        ["firstName", "lastName"]
      );
      this.employeeName.setValue(data.register?._employee.firstName);
    });
  }
}
