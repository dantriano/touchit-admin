import { Injectable } from "@angular/core";
import { ApolloService } from "./apollo.service";
import gql from "graphql-tag";
import { User } from "app/@core/models";
import { Service } from "./service";
import { Observable } from "rxjs";

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
    query users($input: userInput!) {
      users(input: $input) {
        ...userFragment
      }
    }
  `;
  loginQuery = gql`
    query login($input: userInput!) {
      login(input: $input) {
        ...userFragment
      }
    }
  `;

  login(input: any): Observable<any> {
    const variables = { input: input };
    console.log(variables)
    const query = gql`
      ${this.loginQuery}
      ${this.fragment}
    `;
    const watch = this.apollo.watch(query, variables);
    watch.subscribe((data) => {
      const result: any = Object.values(data)[0];
      this.subject.next(this.toModel(result));
    });
    return watch;
  }
  static fragment = gql`
    fragment userFragment on User {
      __typename
      _id
      firstName
      lastName
      picture
      email
      companies
      _company {
        _id
        name
      }
      token
    }
  `;
}
