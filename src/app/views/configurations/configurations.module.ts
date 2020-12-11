import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FullCalendarModule } from "@fullcalendar/angular";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";

import {
  TablesRoutingModule,
  routedComponents,
} from "./configurations-routing.module";

import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { ModalModule } from "ngx-bootstrap/modal";
import { MatListModule } from "@angular/material/list";
import { TabsModule } from "ngx-bootstrap/tabs";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatSelectModule } from "@angular/material/select";

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
    MatAutocompleteModule,
    MatSelectModule,
    TabsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [...routedComponents],
})
export class ConfigurationsModule {}
