import { Component, OnInit } from "@angular/core";
import { CompanyService } from "app/@core/services";
import { Observable } from "rxjs";

@Component({
  selector: "settings-main",
  templateUrl: "./settings-main.component.html",
})
//export class SettingsMainComponent {}
export class SettingsMainComponent implements OnInit {
  protected services: any;
  protected obs$: Observable<any>;
  constructor(protected companyService: CompanyService) {
    this.services = { company: this.companyService };
  }
  ngOnInit() {
    this.obs$ = this.loadContent();
    this.obs$.subscribe(this.onContentLoad);
  }
  loadContent(): Observable<any> {
    let query = {};
    return this.services["company"].loadOne(query);
  }
  onContentLoad = {
    next: (x) => {
      this.companyService.loadData(x);
      return;
    },
    error: (err) => {
      console.log(err);
      return;
    },
  };
}
