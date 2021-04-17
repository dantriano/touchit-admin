import { Injectable } from "@angular/core";
import { ApolloService } from "./apollo.service";
import gql from "graphql-tag";
import { Company } from "app/@core/models";
import { Service } from "./service";
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class CompanyService extends Service {
  private company: Company;
  constructor(protected apollo: ApolloService) {
    super(apollo);
    this.fragment = CompanyService.fragment;
  }
  converToModel(x) {
    return new Company().deserialize(x);
  }
  toModel = this.converToModel;
  get data(): Company {
    return this.company;
  }
  set data(company) {
    this.company = company;
  }
  saveQuery = gql`
    mutation saveCompany($input: companyInput!) {
      saveCompany(input: $input)
    }
  `;
  removeQuery = gql`
    mutation removeCompany($input: companyInput!) {
      removeCompany(input: $input)
    }
  `;
  oneQuery = gql`
    query company($input: companyInput) {
      company(input: $input) {
        ...companyFragment
      }
    }
  `;
  listQuery = gql`
    query companies($input: companyInput) {
      companies(input: $input) {
        ...companyFragment
      }
    }
  `;
  static fragment = gql`
    fragment companyFragment on Company {
      __typename
      _id
      name
      locations {
        _id
        name
        zones {
          latsLngs {
            lat
            lng
          }
        }
      }
      groups {
        _id
        name
        activities
        options
      }
      activities {
        _id
        name
        startTo
        startFrom
        duration
        days
        locations
        options
      }
      schedules {
        _id
        name
        options
        startFrom
        startTo
        duration
        days
        locations
      }
      employees {
        _id
        email
        firstName
        lastName
        groups
        options
        mainActivity
        customActivities {
          _id
          status
        }
        linkCode
        isLinked
      }
    }
  `;

  private companyData = new Subject<Company>();
  companyData$ = this.companyData.asObservable();

  loadData(company: Object = {}) {
    this.loadOne({ _id: company }).subscribe(this.onContentLoad);
    return this.companyData$;
  }
  onContentLoad = {
    next: (data) => {
      this.data = this.converToModel(Object.values(data)[0]);
      this.companyData.next(this.data);
      return;
    },
    error: (err) => {
      console.log(err);
      return;
    },
  };
}
