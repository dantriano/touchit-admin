import { Injectable } from "@angular/core";
import { ApolloService } from "./apollo.service";
import gql from "graphql-tag";
import { Configuration } from "app/@core/models";
import { Service } from "./service";

@Injectable({ providedIn: "root" })
export class ConfigurationService extends Service {
  constructor(protected apollo: ApolloService) {
    super(apollo);
  }
  converToModel(x) {
    return new Configuration().deserialize(x);
  }
  toModel = this.converToModel;
  saveQuery = gql`
    mutation saveConfiguration($input: configurationInput!) {
      saveConfiguration(input: $input)
    }
  `;
  removeQuery = gql`
    mutation removeConfiguration($input: configurationInput!) {
      removeConfiguration(input: $input)
    }
  `;
  oneQuery = gql`
    query($input: configurationInput) {
      configuration(input: $input) {
        ...configurationFragment
      }
    }
  `;
  listQuery = gql`
    query configurations($input: configurationInput) {
      configurations(input: $input) {
        ...configurationFragment
      }
    }
  `;
  fragment = gql`
    fragment configurationFragment on Configuration {
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
