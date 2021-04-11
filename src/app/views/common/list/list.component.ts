import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { ToastrService } from "ngx-toastr";
import { concat, Observable, of, Subject, Subscription } from "rxjs";
import { AuthenticationService } from "app/@core/utils";
import { AppInjector } from "app/app.module";
import { msg } from "../_options";

export class ListComponent implements OnInit {
  loadComponent() {}
  protected dataSource = new MatTableDataSource<any>();
  protected obs$: Observable<any>;
  protected subscription: Subscription[] = [];
  protected services: any;
  protected toastrService: ToastrService;
  protected authService: AuthenticationService;
  protected toastr: ToastrService;

  protected dataTable = new Subject<any>();
  protected dataTable$ = this.dataTable.asObservable();

  /*private _config: any = {
    redirect: "settings",
    uiName: "Element",
    company: null,
  };*/
  set config(obj) {
    this._config = { ...this._config, ...obj };
  }
  get config() {
    return this._config;
  }
  constructor(protected _config?: any) {
    this.toastr = AppInjector.get(ToastrService);
    this.toastrService = AppInjector.get(ToastrService);
    this.authService = AppInjector.get(AuthenticationService);
    this.config = {
      company: this.authService.company
        ? this.authService.company.company
        : null,
    };
    this.config.query = { company: this.config.company };
  }
  fillTable: any = {
    next: (x) => {
      this.dataSource.data = x || [];
      return;
    },
  };
  onContentLoad = {
    next: (x) => {
      return;
    },
    error: (err) => {
      this.toastr.error(msg(this.config).error.ups);
      return;
    },
  };
  /**
   *  Execution on Page Load
   */
  ngOnInit() {
    this.loadComponent();
    this.loadContent();
    this.subscription.push(this.obs$?.subscribe(this.onContentLoad));
    this.subscription.push(this.dataTable?.subscribe(this.fillTable));
  }
  /**
   * First Function to be executed. Used to load all configurations in the components
   * Destroy suscription when page change
   */
  loadContent() {
    this.obs$ = this.services
      ? concat(this.services[this.config.service].loadList(this.config.query))
      : of(true);
  }

  /**
   * Destroys all subscriptions to avoid memory leak
   */
  ngOnDestroy() {
    /*this.subscription.forEach((element) => {
      element?.unsubscribe();
    });*/
  }

  /**
   * Alert before remove from DB
   */
  confirmDelete() {
    this.services[this.config.service]
      .remove({ _id: this.config._id })
      .subscribe((x) => this.loadContent());
    this.config._id = null;
  }
  /**
   * Filters by string any row
   * @param event Object that throw the filter
   */
  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
