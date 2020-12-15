import { CompanyService, ConfigurationService } from "app/@core/services";
import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable, zip } from "rxjs";
import { config } from "./_options";
import { FormComponent } from "@views/common/form/form.component";

@Component({
  selector: "options-form",
  templateUrl: "./options-form.component.html",
})
/**
 * Component to generate the Employee Form Page
 */
export class OptionsFormComponent extends FormComponent {
  public configuration: Observable<any>;
  public companies: Observable<any>;
  constructor(
    public activatedRoute: ActivatedRoute,
    public configurationService: ConfigurationService,
    public companyService: CompanyService
  ) {
    super(activatedRoute);
    this.services = {
      configuration: this.configurationService,
      company: this.companyService,
    };
  }
  /**
   * Load the component elements and configuration
   */
  loadComponent() {
    this.config = config;
    this.configuration = this.services.configuration.getOneObs;
    this.companies = this.services.configuration.getListObs;

    this.config.formInputs = {
      _id: [],
      type: ["option"],
      name: ["", [this.validators.required]],
      company: [],
      section: [],
      status: [],
    };
  }
  loadContent() {
    return zip(
      this.services[this.config.service].loadOne(this.config.query),
      this.services.company.loadList()
    );
  }
}
