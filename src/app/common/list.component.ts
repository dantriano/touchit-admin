import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'app/@core/utils';

export class ListComponent implements OnInit {
  protected dataSource = new MatTableDataSource<any>();
  protected _id: string;
  protected subscription: Subscription;
  protected service: any;
  protected model: string;
  protected company:string = null;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @ViewChild('dangerModal') public dangerModal: ModalDirective;

  constructor(public toastr: ToastrService,public authService: AuthenticationService  ) { 
    this.company = this.authService.company._id;
  }
  set(attr, service) { this[attr] = service }
  get(attr) { return this[attr] }
  
  /**
   *  Execution on Page Load
   */
  ngOnInit() {
    const input = {'company':this.company}
    this.loadComponent();
    this.subscription = this.service.getList(input).subscribe((res) => {
      const data = res.data
      this.dataSource.data = data[this.model]||[];
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  
  /**
   * First Function to be executed. Used to load all configurations in the components
   * Destroy suscription when page change
   */ 
  loadComponent() { }
  ngOnDestroy() { this.subscription.unsubscribe()}
  
  /**
   * Alert before remove from DB
   */
  confirmDelete() {
    this.service.remove(this._id).subscribe(
      (data) => {
        this.dataSource.data = this.dataSource.data.filter(item => item._id != this._id);
        this.toastr.success('Group deleted')
      })
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
