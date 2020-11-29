import { Component, ViewChildren } from '@angular/core';
import { EmployeesComponent } from '../employees.component';

@Component({
  selector: 'employees-profile',
  templateUrl: './employees-profile.component.html',
})

export class EmployeesProfileComponent extends EmployeesComponent {
  loadComponent(){
    super.loadComponent();
    this.set('displayedColumns', ['status','name']);
  }
}
