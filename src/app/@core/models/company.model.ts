import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

@Injectable()
export class CompanyModel {
  constructor(private apollo: Apollo) {}
  static getFragment() {
    return gql`
      fragment companyFragment on Company {
        __typename
        _id
        name
      }
    `;
  }
  getOne(input: any) {
    const companyFragment = CompanyModel.getFragment();
    const query = gql`
      query comapany($input: companyInput) {
        comapany(input: $input) {
          ...companyFragment
        }
      }
      ${companyFragment}
    `;
    return this.apollo.watchQuery<any>({
      query: query,
      variables: { input: input },
      fetchPolicy: "network-only",
    }).valueChanges;
  }
  getList(input: any) {
    const companyFragment = CompanyModel.getFragment();
    const query = gql`
      query companies($input: companyInput) {
        companies(input: $input) {
          ...companyFragment
        }
      }
      ${companyFragment}
    `;

    return this.apollo.watchQuery<any>({
      query: query,
      variables: { input: input },
      fetchPolicy: "network-only",
    }).valueChanges;
  }
  load(input: any) {}
  save(input: any) {
    const mutation = gql`
      mutation saveCompany($input: companyInput!) {
        saveCompany(input: $input)
      }
    `;
    return this.apollo.mutate<any>({
      mutation: mutation,
      variables: { input: input },
    });
  }
  remove(id: string) {
    const mutation = gql`
      mutation removeCompany($id: ID!) {
        removeCompany(_id: $id)
      }
    `;
    return this.apollo.mutate<any>({
      mutation: mutation,
      variables: { id: id },
    });
  }
}
