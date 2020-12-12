import { OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { ToastrService } from "ngx-toastr";
import { concat, Observable, of, Subscription } from "rxjs";
import { AuthenticationService } from "app/@core/utils";
import { AppInjector } from "app/app.module";

export class ListComponent implements OnInit {
  loadComponent() {}
  protected dataSource = new MatTableDataSource<any>();
  protected dataTable: Observable<any>;
  protected obs$: Observable<any>;
  protected _id: string;
  protected subscription: Subscription[] = [];
  protected service: any;
  protected model: string;
  protected company: string = null;
  protected toastrService: ToastrService;
  protected authService: AuthenticationService;
  protected observers;
  protected services: any;
  protected displayedColumns: string[] = [];
  protected displayedOptions;

  private _config: any = {
    redirect: "settings",
    uiName: "Element",
  };
  set config(obj) {
    this._config = { ...this._config, ...obj };
  }
  get config() {
    return this._config;
  }
  constructor() {
    this.toastrService = AppInjector.get(ToastrService);
    this.authService = AppInjector.get(AuthenticationService);
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
  };

  set(attr: string, service: any) {
    this[attr] = service;
  }
  get(attr: string) {
    return this[attr];
  }

  /**
   *  Execution on Page Load
   */
  ngOnInit() {
    this.company = this.authService.company._id;
    this.loadComponent();
    this.obs$ = this.loadContent();
    this.subscription.push(this.obs$.subscribe(this.onContentLoad));
    this.subscription.push(this.dataTable.subscribe(this.fillTable));
  }
  /**
   * First Function to be executed. Used to load all configurations in the components
   * Destroy suscription when page change
   */
  loadContent(): Observable<any> {
    return new Observable();
  }

  /**
   * Destroys all subscriptions to avoid memory leak
   */
  ngOnDestroy() {
    this.subscription.forEach((element) => {
      element?.unsubscribe();
    });
  }

  /**
   * Alert before remove from DB
   */
  confirmDelete() {
    concat(
      of(this.services[this.config.service].remove(this._id)),
      of(this.loadContent())
    );
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
