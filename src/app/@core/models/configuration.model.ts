import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { map } from "rxjs/operators";
import { ConfigurationData } from "../data/configuration";
import { CompanyModel } from "./company.model";

@Injectable()
export class ConfigurationModel {
  private _types = {
    locationOptions: "locationOptions",
    activityOptions: "activityOptions",
  };
  constructor(private apollo: Apollo) {}
  getType(type: string) {
    return this._types[type];
  }
  static getInputById(id) {
    return { id: id, status: "active" };
  }

  static getFragment() {
    return gql`
      fragment configFragment on Configuration {
        __typename
        _id
        type
        name
        desc
        status
        companies
        value {
          name
          sections
          status
        }
      }
    `;
  }
  get(input: Object) {
    const configFragment = ConfigurationModel.getFragment();
    const query = gql`
      query($input: configurationInput) {
        configuration(input: $input) {
          ...configFragment
        }
      }
      ${configFragment}
    `;
    return this.apollo.watchQuery<any>({
      query: query,
      variables: { input: input },
    }).valueChanges;
  }
  load(input: any) {
    const configFragment = ConfigurationModel.getFragment();
    const companyFragment = CompanyModel.getFragment();

    const configurationInput = {};
    const companyInput = {};
    const query = gql`
      query(
        $configurationInput: configurationInput
        $companyInput: companyInput
      ) {
        configuration(input: $configurationInput) {
          ...configFragment
        }
        companies(input: $companyInput) {
          ...companyFragment
        }
      }
      ${configFragment}
      ${companyFragment}
    `;
    return this.apollo.watchQuery<any>({
      query: query,
      variables: {
        configurationInput: configurationInput,
        companyInput: companyInput,
      },
      fetchPolicy: "network-only",
    }).valueChanges;
  }
}
