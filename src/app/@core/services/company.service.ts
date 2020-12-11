import { Injectable } from "@angular/core";
import { ApolloService } from "./apollo.service";

import gql from "graphql-tag";
import { Observable, BehaviorSubject, of } from "rxjs";
import { Company } from "app/@core/models";

@Injectable({ providedIn: "root" })
export class CompanyService {
  constructor(private apollo: ApolloService) {}
  private subject = new BehaviorSubject<Company>(null);
  private subjectList = new BehaviorSubject<Company[]>([]);
  get company(): Observable<Company> {
    return this.subject.asObservable();
  }
  get companies(): Observable<Company[]> {
    return this.subjectList.asObservable();
  }
  set(company: Company) {
    this.subject.next(company);
  }
  setAll(companies: Company[]) {
    this.subjectList.next(companies);
  }
  public getFragment = gql`
    fragment companyFragment on Company {
      __typename
      _id
      name
    }
  `;
  getOne(input: any): Observable<any> {
    const variables = { input: input };
    const query = gql`
      query comapany($input: companyInput) {
        comapany(input: $input) {
          ...companyFragment
        }
      }
      ${this.getFragment}
    `;
    const watch = this.apollo.watch(query, variables).subscribe((data) => {
      this.set(new Company().deserialize(data.comapany));
    });
    return of(watch);
  }
  getList(input: any): Observable<any> {
    const variables = { input: input };
    const query = gql`
      query companies($input: companyInput) {
        companies(input: $input) {
          ...companyFragment
        }
      }
      ${this.getFragment}
    `;
    const watch = this.apollo.watch(query, variables).subscribe((data) => {
      const result = data.companies.map((x) => new Company().deserialize(x));
      this.setAll(result);
    });
    return of(watch);
  }
  save(input: any) {
    const variables = { input: input };
    const mutation = gql`
      mutation saveCompany($input: companyInput!) {
        saveCompany(input: $input)
      }
    `;
    return this.apollo.mutation(mutation, variables);
  }
  remove(id: string) {
    const variables = { id: id };
    const mutation = gql`
      mutation removeCompany($id: ID!) {
        removeCompany(_id: $id)
      }
    `;
    return this.apollo.mutation(mutation, variables);
  }
}
