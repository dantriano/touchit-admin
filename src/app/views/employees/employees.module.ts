import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FullCalendarModule } from "@fullcalendar/angular";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";

import {
  TablesRoutingModule,
  routedComponents,
} from "./employees-routing.module";

import { EmployeesListComponent } from "./employees-list/employees-list.component";
import { EmployeesCalendarComponent } from "./employees-calendar/employees-calendar.component";
//import { EmployeesFormComponent } from "./employees-form/employees-form.component";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { ModalModule } from "ngx-bootstrap/modal";
import { MatListModule } from "@angular/material/list";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    TablesRoutingModule,
    FullCalendarModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatListModule,
    ModalModule.forRoot(),
    BsDropdownModule,
    FormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [EmployeesListComponent],
  bootstrap: [EmployeesListComponent, EmployeesCalendarComponent],
  declarations: [
    ...routedComponents,
    EmployeesCalendarComponent,
    //EmployeesFormComponent,
  ],
})
export class EmployeesModule {}
