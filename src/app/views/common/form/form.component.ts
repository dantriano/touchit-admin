import { Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AppInjector } from "app/app.module";
import { ToastrService } from "ngx-toastr";
import { first } from "rxjs/operators";
import {
  BehaviorSubject,
  concat,
  Observable,
  of,
  Subject,
  Subscription,
} from "rxjs";
import { FormValidator } from "./form.validator";
import { AuthenticationService, MapsService } from "app/@core/utils";
import { msg } from "../_options";
import { loadAutocomplete } from "@utils/commons.service";

export class FormComponent {
  //@ViewChild("infoModal") public dangerModal: ModalDirective;

  @Output() onLoadContent = new EventEmitter();
  @Output() onSubmitComplete = new EventEmitter();

  protected formSubject = new BehaviorSubject<any>(null);
  protected loadAutocomplete = loadAutocomplete;
  //protected obs$: Observable<any>;
  protected subscriptions: Subscription[] = [];
  protected mapMgr: MapsService = new MapsService();
  protected form: FormGroup;
  protected submitted: boolean = false;
  protected formChanged: boolean = false;
  protected contentLoad: boolean = false;
  protected toastr: ToastrService;
  protected router: Router;
  protected authService: AuthenticationService;
  protected services: any;

  protected obs = new Subject<any>();
  obs$ = this.obs.asObservable();

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected _config?: any
  ) {
    this.router = AppInjector.get(Router);
    this.toastr = AppInjector.get(ToastrService);
    this.authService = AppInjector.get(AuthenticationService);
  }
  protected validators: any = {
    valueExist: () =>
      FormValidator.valueExist(
        this.services[this.config.service],
        this.config.service
      ),
    required: Validators.required,
    email: Validators.email,
  };
  /*private _config: any = {
    redirect: "settings",
    uiName: "Element",
  };*/
  get formData(): Observable<any> {
    return this.formSubject.asObservable();
  }
  get f() {
    return this.form.controls;
  }
  get m() {
    return this.mapMgr;
  }
  set config(obj) {
    this._config = { ...this._config, ...obj };
  }
  get config() {
    return this._config;
  }
  submitObserver: any = {
    next: (x) => {
      console.log(x)
      this.toastr.success(msg(this.config).success.saved);
      this.router.navigate([this.config.redirect]);
      return;
    },
    error: (err) => {
      this.toastr.error(msg(this.config).error.ups);
      this.router.navigate([this.config.redirect]);
      return;
    },
    complete: (x) => {
      this.onSubmitComplete.emit(x);
      console.log("Submition completed");
    },
  };
  onRouteLoad: any = {
    next: (params) => {
      this.config._id = params.id || null;
      this.config = {
        company: this.authService.currentCompany
          ? this.authService.currentCompany
          : null,
      };
      this.config.query = {
        company: this.config.company,
        _id: this.config._id,
      };
      //if (this.config._id) 
      this.loadContent();
    },
  };
  onContentLoad: any = {
    next: (x) => {
      this.contentLoad = true;
      this.populateForm(x);
    },
    error: (err) => {
      this.toastr.error(msg(this.config).error.ups);
      return;
    },
    complete: (x) => {
      this.onLoadContent.emit(x);
    },
  };

  ngOnInit() {
    this.loadComponent();
    this.loadForm();
    this.subscriptions.push(
      this.activatedRoute.params.subscribe(this.onRouteLoad),
      this.obs$.subscribe(this.onContentLoad)
    );
  }
  /**
   * First Function to be executed. Used to load all configurations in the components
   */
  loadComponent() {}
  loadContent() {
    this.obs$ = this.services
      ? concat(this.services[this.config.service].loadOne(this.config.query))
      : of(true);
    //this.subscriptions.push(this.formData.subscribe(this.dataObserver));
  }
  /**
   * Destroys all subscriptions to avoid memory leak
   */
  ngOnDestroy() {
    this.subscriptions.forEach((element) => {
      element?.unsubscribe();
    });
  }
  /**
   * Init the service to show a Map in the components
   */
  loadMap() {
    this.mapMgr = new MapsService();
  }

  /**
   * Defined the component map with the object in the view
   * @param map Object Map defined in the view
   */
  onMapReady(map) {
    this.mapMgr.setMap(map);
  }
  /**
   * Load the components with all the fields defined in the child components
   */
  loadForm() {
    this.form = new FormBuilder().group(this.config.formInputs);
    this.onFormChanges();
  }

  populateForm(formData) {
    if (Object.keys(formData).length === 0 && this.contentLoad && this.config._id) {
      this.toastr.error(msg(this.config).error.notFound);
      this.router.navigate([this.config.redirect]);
      return;
    }
    Object.keys(formData).length !== 0 && this.form.patchValue(formData);
  }
  /**
   * Action when the user submit a form
   */
  onSubmit() {
    !this.form.valid && this.toastr.error(msg(this.config).error.errorForm);
    if (this.submitted || !this.form.valid) return;
    this.submitted = true;
    this.saveForm();
  }

  /**
   * Save data in the DataBase and attach an Observer when the data are stored
   */
  saveForm() {
    this.services[this.config.service]
      .save(this.form.value)
      .subscribe(this.submitObserver);
  }

  /**
   * Action when the user cancel a form
   */
  onReset() {
    this.submitted = false;
    this.form.reset();
    this.router.navigate([this.config.redirect]);
  }

  /**
   * Action when the user types in any form field
   */
  onFormChanges(): void {
    this.form.valueChanges.subscribe((val) => {
      this.formChanged = true;
    });
  }
}
