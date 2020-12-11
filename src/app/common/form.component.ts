import { Component, ViewChild, Output, EventEmitter } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AppInjector } from "app/app.module";
import { ModalDirective } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";
import { map, startWith } from "rxjs/operators";
import { Observable, Subject, Subscription } from "rxjs";
import { FormValidator } from "./form.validator";
import { AuthenticationService, MapsService } from "app/@core/utils";
import { CommonServices } from "app/@core/utils";

export class FormComponent {
  @Output() onLoadContent = new EventEmitter();
  @Output() onSubmitComplete = new EventEmitter();
  protected subscription: Subscription;
  protected _id: any = null;
  protected obs$: Observable<any>;
  protected mapMgr: MapsService = new MapsService();
  protected common: CommonServices = new CommonServices();
  protected form: FormGroup;
  protected submitted: boolean = false;
  protected formChanged: boolean = false;
  protected model: string;
  protected service: any;
  protected formInputs: any = {};
  protected formData: Subject<any> = new Subject<any>();
  protected company: string = null;
  public toastr: ToastrService;
  public route: ActivatedRoute;
  public router: Router;
  public authService:AuthenticationService;
  protected validators: any = {
    valueExist: () => FormValidator.valueExist(this.service, this.model),
    required: Validators.required,
    email: Validators.email,
  };
  private _config: any = {
    redirect: "settings",
    uiName: "Element",
  };
  msg: any = {
    success: {
      crated: `${this.config.uiName} created`,
      updated: `${this.config.uiName}  updated`,
      saved: `${this.config.uiName}  saved`,
      deleted: `${this.config.uiName}  deleted`,
    },
    error: {
      notFound: `${this.config.uiName} not found`,
      ups: "Ups..Something happend",
    },
  };
  dataObserver: any = {
    next: (x) => { 
      if(!x && this._id){
        this.toastr.error(this.msg.error.notFound);
        this.router.navigate([this.config.redirect]);
        return
      }
      x && this.form.patchValue(x);
      return;
    },
    error: (err) => {
      return;
    },
    complete: (x) => console.log("Observer got a complete notification"),
  };
  submitObserver: any = {
    next: (x) => {
      this.onSubmitComplete.emit(x);
      this.toastr.success(this.msg.success.saved);
      this.router.navigate([this.config.redirect]);
      return;
    },
    error: (err) => {
      this.onSubmitComplete.emit(err);
      this.toastr.error(this.msg.error.ups);
      this.router.navigate([this.config.redirect]);
      return;
    },
    complete: (x) => console.log("Observer got a complete notification"),
  };

  @ViewChild("infoModal") public dangerModal: ModalDirective;

  constructor(
    public route2: ActivatedRoute,
    public router2: Router,
    public toastr2: ToastrService
  ) {
    this.router = AppInjector.get(Router);
    this.toastr = AppInjector.get(ToastrService);
    this.authService = AppInjector.get(AuthenticationService);
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
  set(attr, obj) {
    this[attr] = obj;
  }
  get(attr) {
    return this[attr];
  }

  /**
   *  Execution on Page Load
   */
  ngOnInit() {
    this._id=null;
    this.company = this.authService.company._id;
    this.loadComponent();
    this.route.params.subscribe((params) => {
      this._id = params.id || null;
      this.loadForm();
      this.loadContent();
      this.subscription=this.formData.subscribe(this.dataObserver);
    });
  }
  /**
   * First Function to be executed. Used to load all configurations in the components
   */
  loadComponent() {}
  loadContent(){}

  ngOnDestroy() {
    this.subscription?.unsubscribe();
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
   * Get all the data from the DataBase using the Load function of the current service
   */
  loadList() {
    
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
    }));*/
  }

  /**
   * Load the components with all the fields defined in the child components
   */
  loadForm() {
    this.form = new FormBuilder().group(this.formInputs);
    this.onFormChanges();
  }
  /**
   * Action when the user submit a form
   */
  onSubmit() {
    this.submitted = true;
    if (!this.form.valid) return;
    this.saveForm();
  }

  /**
   * Save data in the DataBase and attach an Observer when the data are stored
   */
  saveForm() {
    return this.service.save(this.form.value).subscribe(this.submitObserver);
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
   *
   * Group of Helpers
   *
   */
  filter(el, id) {
    return this.common.getObjectByFilter(el, id);
  }
  find(el, id) {
    return this.common.getObjectByFind(el, id);
  }
  index(el, id) {
    return this.common.getIndexById(el, id);
  }

  /**
   *
   * Autocomplete Functions
   *
   */

  /**
   *
   * @param source List of the elements to find a match. Forexemple data from DB
   * @param control Form field
   * @param by Fields to be filtered
   */
  public loadAutocomplete(source: any[], control: FormControl, by: any) {
    return control.valueChanges.pipe(
      startWith(""),
      map((value) =>
        value
          ? this._filterAutocompleteMultiple(source, value, by)
          : source.slice()
      )
    );
  }

  /**
   * Filter to transform the showed messages in the autocomplete
   * @param source  List of the elements to find a match. Forexemple data from DB
   * @param value Value type for the user in the field
   * @param by Field to be filtered
   */
  private _filterAutocomplete(source: any[], value: string, by: string): any[] {
    const filterValue = value.toLowerCase();
    return source.filter((x) => x[by].toLowerCase().indexOf(filterValue) === 0);
  }

  /**
   * Filter improved to accept multiples fields
   * @param source  List of the elements to find a match. Forexemple data from DB
   * @param value Value type for the user in the field
   * @param filters Fields to be filtered
   */
  private _filterAutocompleteMultiple(
    source: Array<any>,
    value: string,
    filters: Array<string>
  ): Array<any> {
    const filterValue = value.toLowerCase();
    return source.filter((item) => {
      var matches = false;
      filters.forEach(function (valor) {
        if (item[valor].toLowerCase().indexOf(filterValue) === 0)
          matches = true;
      });
      return matches;
    });
  }

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
