import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ToastrService } from "ngx-toastr";
import { ModalDirective } from "ngx-bootstrap/modal";
import { BehaviorSubject, Observable, Subject, Subscription } from "rxjs";
import { AuthenticationService } from "app/@core/utils";
import { AppInjector } from "app/app.module";

export class ListComponent implements OnInit {
  protected dataSource = new MatTableDataSource<any>();
  protected _id: string;
  protected subscription: Subscription;
  protected service: any;
  protected model: string;
  protected company: string = null;
  protected private: any;
  protected obs$: Observable<any>;
  protected toastr: ToastrService;
  protected authService: AuthenticationService;
  protected listData:Subject<any>= new Subject<any>();

  protected fillTable: any = {
    next: (x) => {
      this.dataSource.data = x || [];
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      return;
    },
    error: (err) => {
      return;
    },
    complete: (x) => console.log("Observer got a complete notification"),
  };
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("dangerModal") public dangerModal: ModalDirective;

  constructor(
    public toastr2: ToastrService,
    public authService2: AuthenticationService
  ) {
    this.toastr = AppInjector.get(ToastrService);
    this.authService = AppInjector.get(AuthenticationService);
    this.company = this.authService.company._id;
  }

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
    this.loadComponent();
    this.listData.subscribe(this.fillTable);
  }
  /**
   * First Function to be executed. Used to load all configurations in the components
   * Destroy suscription when page change
   */
  loadComponent() {}
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  /**
   * Alert before remove from DB
   */
  confirmDelete() {
    this.service.remove(this._id).subscribe((data) => {
      this.dataSource.data = this.dataSource.data.filter(
        (item) => item._id != this._id
      );
      this.toastr.success("Group deleted");
    });
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
