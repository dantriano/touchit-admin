import { Injectable } from "@angular/core";
import { ApolloService } from "./apollo.service";
import gql from "graphql-tag";
import { Company } from "app/@core/models";
import { Service } from "./service";

@Injectable({ providedIn: "root" })
export class CompanyService extends Service {
  constructor(protected apollo: ApolloService) {
    super(apollo);
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
    query activity($input: activityInput) {
      activity(input: $input) {
        ...activityFragment
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
  fragment = gql`
    fragment companyFragment on Company {
      __typename
      _id
      name
    }
  `;
}
