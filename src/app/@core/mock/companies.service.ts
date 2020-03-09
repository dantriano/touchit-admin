import { Injectable } from '@angular/core';
import { EmployeeData } from '../data/employee';
import { CompaniesData, Companies } from '../data/companies';


@Injectable()
export class CompaniesService extends CompaniesData {
  employees: EmployeeData;
  private companies: Companies[] = [
    {
      id: '1',
      name: 'Sony',
      picture: 'assets/images/nick.png',
      employees: this.employees.getList(),
      locations: null,
      services: null,
      groups: null,
      register: null,
      status: 'up'
    }
  ];
  newCompany() {
    return {
      id: (this.companies.length + 1).toString(),
      name: 'Sony',
      picture: 'assets/images/nick.png',
      employees: this.employees.getList(),
      locations: null,
      services: null,
      groups: null,
      register: null,
      status: 'up'
    }
  }
  addCompany(el: Companies) {
    var index = this.companies.indexOf(el);
    if (index !== -1) {
      this.companies[index] = el;
    } else {
      this.companies.push(el);
    }
  }
  getCompanies() {
    return this.companies;
  }

  getAllCompanies() {
    return this.companies;
  }
  getCompany(id: string) {
    return this.companies.find(element => element.id == id);
  }
}