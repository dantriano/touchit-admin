import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ModalUIComponent } from './modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot()
  ],
  exports:[ModalModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [ModalUIComponent],
  bootstrap: [ModalUIComponent]
})
export class ModalUIModule { }
