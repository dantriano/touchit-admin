import { Injectable } from "@angular/core";
import { ApolloService } from "./apollo.service";
import gql from "graphql-tag";
import { User } from "app/@core/models";
import { Service } from "./service";

@Injectable({ providedIn: "root" })
export class UserService extends Service {
  constructor(protected apollo: ApolloService) {
    super(apollo);
    this.fragment = UserService.fragment;
  }
  converToModel(x) {
    return new User().deserialize(x);
  }
  toModel = this.converToModel;
  saveQuery = gql`
    mutation saveUser($input: userInput!) {
      saveUser(input: $input)
    }
  `;
  removeQuery = gql`
    mutation removeUser($input: userInput!) {
      removeUser(input: $input)
    }
  `;
  oneQuery = gql`
    query user($input: userInput!) {
      user(input: $input) {
        ...userFragment
      }
    }
  `;
  listQuery = gql`
    query login($input: userInput!) {
      login(input: $input) {
        ...userFragment
      }
    }
  `;
  static fragment = gql`
    fragment userFragment on User {
      __typename
      _id
      firstName
      lastName
      picture
      email
      _company {
        _id
        name
      }
      _employee {
        _id
        firstName
      }
      token
    }
  `;
}
