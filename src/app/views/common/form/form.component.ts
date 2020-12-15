import { Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AppInjector } from "app/app.module";
import { ToastrService } from "ngx-toastr";
import { first } from "rxjs/operators";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
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
  protected obs$: Observable<any>;
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
  constructor(protected activatedRoute: ActivatedRoute) {
    this.router = AppInjector.get(Router);
    this.toastr = AppInjector.get(ToastrService);
    this.authService = AppInjector.get(AuthenticationService);
    this.subscriptions.push(
      activatedRoute.params.subscribe((params) => {
        this.config._id = params.id || null;
        this.config = { company: this.authService.company._id };
        this.config.query = {
          company: this.config.company,
          _id: this.config._id,
        };
      })
    );
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
  private _config: any = {
    redirect: "settings",
    uiName: "Element",
  };
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

  /*dataObserver: any = {
    next: (x) => {
      if (!x && this.contentLoad && this.config._id) {
        this.toastr.error(msg(this.config).error.notFound);
        this.router.navigate([this.config.redirect]);
        return;
      }
      x && this.form.patchValue(x);
      return;
    },
    error: (err) => {
      this.toastr.error(msg(this.config).error.ups);
      return;
    },
    complete: (x) => console.log("Observer got a complete notification"),
  };*/
  submitObserver: any = {
    next: (x) => {
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

  onContentLoad: any = {
    next: (x) => {
      this.contentLoad = true;
      let formData=this.services[this.config.service].subject.getValue()
      this.populateForm(formData);
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
    this.obs$ = this.loadContent().pipe(first());
    this.subscriptions.push(this.obs$.subscribe(this.onContentLoad));
    //this.subscriptions.push(this.formData.subscribe(this.dataObserver));
  }
  /**
   * First Function to be executed. Used to load all configurations in the components
   */
  loadComponent() {}
  loadContent(): Observable<any> {
    return null;
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
    if (!formData && this.contentLoad && this.config._id) {
      this.toastr.error(msg(this.config).error.notFound);
      this.router.navigate([this.config.redirect]);
      return;
    }
    formData && this.form.patchValue(formData);
  }
  /**
   * Action when the user submit a form
   */
  onSubmit() {
    if (this.submitted || !this.form.valid) return;
    this.submitted = true;
    this.saveForm();
  }

  /**
   * Save data in the DataBase and attach an Observer when the data are stored
   */
  saveForm() {
    console.log(this.form.value);
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

  /**
   * Get all the data from the DataBase using the Load function of the current service
   */
  /*loadList() {
    //this.obs$ =  this.service.load({ '_id': this._id ,'company': this.company });
    /*this.obs$ = this.service.load({ '_id': this._id ,'company': this.company }).pipe(map(res => {
      this.formData = res['data']
      console.log(this.formData)
      if (this._id && !this.formData[this.model]) {
        this.toastr.error(this.msg.error.notFound);
        this.router.navigate([this.config.redirect]);
        return;
      }
      if (this.formData[this.model]) this.form.patchValue(this.formData[this.model])
      this.onLoadContent.emit(this.formData);
      return this.formData
    }, (error) => {
      this.toastr.error(this.msg.error.ups);
      this.router.navigate([this.config.redirect]);
      return;
    }));
  }*/
  /**
   *
   * Group of Helpers
   *
   */
  /*
  filter(el, id) {
    return this.common.getObjectByFilter(el, id);
  }
  find(el, id) {
    return this.common.getObjectByFind(el, id);
  }
  index(el, id) {
    return this.common.getIndexById(el, id);
  }
*/

  /*setObject(object,el, reset?) {
    if (reset) return []
    let index = this.index(object,el._id)
    object.splice(index, 1);
    object.push(el)
    return object;
  }*/
  /*switchElement(el, source, dest) {
    dest.push(el);
    source.splice(source.indexOf(el), 1);
  }

  /*setOption(input, object, reset?) {
    let values = this.form.controls[input].value;
    if (reset) values = []
    if (values && values.length > 0 && object._id) {
      let index = values.findIndex((obj => obj._id == object._id));
      if (index !== -1) values.splice(index, 1);
    }
    if (object) values.push(object)
    this.form.controls[input].setValue(values);
  }
  /*getOption(_id, input) {
    let values = this.form.controls[input].value;
    return (_id && values && values.length > 0) ? values.filter((obj => obj._id == _id))[0] : null;
  }

  unsetOption(input, object) {
    let values = this.form.controls[input].value;
    let index = values.findIndex((obj => obj._id == object._id));
    if (index !== -1) values.splice(index, 1);
    this.form.controls[input].setValue(values);
  }
  /*switchTriStatus(_id, input) {
    let el = this.getOption(_id, input)

    if (!el || el.status === 'null') status = 'allow'
    else if (el.status === 'allow') status = 'deny'
    else if (el.status === 'deny') status = 'null'

    let object = { '_id': _id, 'status': status };
    this.setOption(input, object);
  }*/
}
