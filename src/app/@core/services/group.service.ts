import { Injectable } from "@angular/core";
import { ApolloService } from "./apollo.service";
import gql from "graphql-tag";
import { Group } from "app/@core/models";
import { Service } from "./service";

@Injectable({ providedIn: "root" })
export class GroupService extends Service {
  fragment=GroupService.fragment
  constructor(protected apollo: ApolloService) {
    super(apollo);
  }
  converToModel(x) {
    return new Group().deserialize(x);
  }
  toModel = this.converToModel;
  saveQuery = gql`
    mutation saveGroup($input: groupInput!) {
      saveGroup(input: $input)
    }
  `;
  removeQuery = gql`
    mutation removeGroup($input: groupInput!) {
      removeGroup(input: $input)
    }
  `;
  oneQuery = gql`
    query group($input: groupInput) {
      group(input: $input) {
        ...groupFragment
      }
    }
  `;
  listQuery = gql`
    query groups($input: groupInput) {
      groups(input: $input) {
        ...groupFragment
      }
    }
  `;
  static fragment = gql`
    fragment groupFragment on Group {
      __typename
      _id
      name
      options
      main
      activities
    }
  `;
}
