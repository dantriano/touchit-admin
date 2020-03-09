import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';

export class ListComponent implements OnInit {
  private displayedColumns: string[] = [];
  private dataSource = new MatTableDataSource<any>();
  private _id: string;
  private subscription: Subscription;
  private service: any;
  private model: string;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @ViewChild('dangerModal') public dangerModal: ModalDirective;

  constructor(public toastr: ToastrService) { }
  set(attr, service) { this[attr] = service }
  get(attr) { return this[attr] }
  public loadComponent() { }
  ngOnInit() {
    this.loadComponent();
    this.subscription = this.service.getList().subscribe((res) => {
      const data = res.data
      console.log(data)
      this.dataSource.data = data[this.model];
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  confirmDelete() {
    this.service.remove(this._id).subscribe(
      (data) => {
        this.dataSource.data = this.dataSource.data.filter(item => item._id != this._id);
        this.toastr.success('Group deleted')
      })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
