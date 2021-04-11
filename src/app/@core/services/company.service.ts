import { Injectable } from "@angular/core";
import { ApolloService } from "./apollo.service";
import gql from "graphql-tag";
import { Company } from "app/@core/models";
import { Service } from "./service";
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class CompanyService extends Service {
  constructor(protected apollo: ApolloService) {
    super(apollo);
    this.fragment = CompanyService.fragment;
  }
  converToModel(x) {
    return new Company().deserialize(x);
  }
  toModel = this.converToModel;
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
      }
    }
  `;

  private companyData = new Subject<Company>();
  companyData$ = this.companyData.asObservable();

  loadData(query:Object={}) {
    console.log(query)
    this.loadOne(query).subscribe(this.onContentLoad);
  }
  onContentLoad = {
    next: (data) => {
      console.log(data)
      const company: Company = this.converToModel(Object.values(data)[0]);
      console.log(company)
      this.companyData.next(company);
      return;
    },
    error: (err) => {
      console.log(err);
      return;
    },
  };
}
