import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";

import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormValidator } from './form.validator';
import { MapsService } from 'app/@core/utils';


export class FormComponent {
  public mapMgr: any;
  private center: any = MapsService.center;
  public form: FormGroup;
  private formValidator: FormValidator;
  private submitted: boolean = false;
  private obs$: Observable<any>;
  private _id: any = null
  private model: string;
  private service: any;
  private formInputs: any = {};
  private uiName = 'Element'
  @Output() onLoadContent= new EventEmitter();
  public validators: any = {
    valueExist: () => FormValidator.valueExist(this.service, this.model),
    required: Validators.required,
    email: Validators.email,
  }
  config: any = {
    'redirect': 'settings',
    'uiName' : 'Element'
  }
  msg: any = {
    success: {
      'crated': `${this.config.uiName} created`,
      'updated': `${this.config.uiName}  updated`,
      'saved': `${this.config.uiName}  saved`,
      'deleted': `${this.config.uiName}  deleted`,
    },
    error: {
      'notFound': `${this.config.uiName} not found`,
      'ups': 'Ups..Something happend'
    }
  }
  submitObserver: any = {
    next: x => {
      this.toastr.success(this.msg.success.saved);
      this.router.navigate([this.config.redirect])
      return
    },
    error: err => {
      this.toastr.error(this.msg.err.ups);
      this.router.navigate([this.config.redirect])
      return
    },
    //complete: () => console.log('Observer got a complete notification'),
  };
  @ViewChild('infoModal') public dangerModal: ModalDirective;

  constructor(public route: ActivatedRoute, public router: Router, public toastr: ToastrService) { }
  test2(e) { e.preventDefault(); event.stopImmediatePropagation() }
  public loadComponent() { }
  ngOnInit() {
    this.loadComponent();
    this.route.params.subscribe(params => {
      this._id = params.id || null;
      this.loadForm();
      this.loadContent();
    });
  }
  test(a){debugger}
  loadForm() {
    this.form = new FormBuilder().group(this.formInputs)
  }
  
  loadContent() {
    this.obs$ = this.service.load({ '_id': this._id }).pipe(map(res => {
      let data = res['data']
      if (this._id && !data[this.model]) {
        this.toastr.error(this.msg.error.notFound);
        this.router.navigate([this.config.redirect]);
        return;
      }
      if (data[this.model]) this.form.patchValue(data[this.model])
      this.onLoadContent.emit(data); 
      console.log(data)
      return data
    }, (error) => {
      this.toastr.error(this.msg.error.ups);
      this.router.navigate([this.config.redirect]);
      return;
    }));
  }
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid)
      return;
    this.saveForm();
  }
  saveForm() {
    return this.service.save(this.form.value).subscribe((this.submitObserver));
  }

  onReset() {
    this.submitted = false;
    this.form.reset();
    this.router.navigate([this.config.redirect]);
  }
  onMapReady(map) {
    this.mapMgr = new MapsService(map);
  }
  switchElement(el, source, dest) {
    dest.push(el);
    source.splice(source.indexOf(el), 1);
  }
  set(attr, obj) { this[attr] = obj }
  get(attr) { return this[attr] }
  
  setOption(input, object, reset?) {
    let values = this.form.controls[input].value;
    if (reset) values = []
    if (values && values.length > 0 && object._id) {
      let index = values.findIndex((obj => obj._id == object._id));
      if (index !== -1) values.splice(index, 1);
    }
    if (object) values.push(object)
    this.form.controls[input].setValue(values);
  }
  getOption(_id, input) {
    let values = this.form.controls[input].value;
    return (_id && values && values.length > 0) ? values.filter((obj => obj._id == _id))[0] : null;
  }

  unsetOption(input, object) {
    let values = this.form.controls[input].value;
    let index = values.findIndex((obj => obj._id == object._id));
    if (index !== -1) values.splice(index, 1);
    this.form.controls[input].setValue(values);
  }
  switchTriStatus(_id, input) {
    let el = this.getOption(_id, input)

    if (!el || el.status==='null') status = 'allow'
    else if (el.status === 'allow') status = 'deny'
    else if (el.status === 'deny') status = 'null'

    let object={ '_id': _id, 'status': status };
    this.setOption(input,object);
  }
}
