import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { FormComponent } from "app/common/form.component";
import { AuthenticationService } from "app/@core/utils";
import { ConfigurationModel } from 'app/@core/models/configuration.model';

@Component({
  selector: "options-form",
  templateUrl: "./options-form.component.html",
})
export class OptionsFormComponent extends FormComponent {
  protected model: string = "configuration";
  constructor(
    public service: ConfigurationModel,
    public route: ActivatedRoute,
    public router: Router,
    public toastr: ToastrService,
    public authService: AuthenticationService
  ) {
    super(route, router, toastr);
  }
  loadComponent() {
    this.config = { redirect: "configurations" };
    this.set("formInputs", {
      _id: [],
      type: ['option'],
      name: ['', [this.validators.required]],
      company: [],
      section: [],
      active: [],
    });
  }
}
