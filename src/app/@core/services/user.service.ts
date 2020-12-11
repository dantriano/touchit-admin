import { Injectable } from "@angular/core";
import gql from "graphql-tag";
import { Observable, BehaviorSubject } from "rxjs";
import { ApolloService } from "./apollo.service";
import { User } from "app/@core/models";

@Injectable({ providedIn: "root" })
export class UserService {
  constructor(private apollo: ApolloService) {}
  private subject = new BehaviorSubject<User>(null);
  get user(): Observable<User> {
    return this.subject.asObservable();
  }
  set(user: User) {
    this.subject.next(user);
  }
  get(): User {
    return this.subject.getValue();
  }

  static getFragment() {
    return gql`
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
  getOne(input: any) {
    const variables = { input: input };
    const query = gql`
      query user($input: userInput!) {
        user(input: $input) {
          ...userFragment
        }
      }
      ${UserService.getFragment()}
    `;
    return this.apollo.watch(query, variables);
  }

  save(input: User) {
    const variables = { input: input };
    const mutation = gql`
      mutation saveUser($input: userInput!) {
        saveUser(input: $input)
      }
    `;
    return this.apollo.mutate<any>({
      mutation: mutation,
      variables: variables,
    });
  }
  remove(id: string) {
    const variables = { id: id };
    const mutation = gql`
      mutation removeUser($id: ID!) {
        removeUser(_id: $id)
      }
    `;
    return this.apollo.mutate<any>({
      mutation: mutation,
      variables: variables,
    });
  }
  /*
  token(input: any):void{
    const variables = { input: input };
    const query = gql`
      query token($input: userInput!) {
        token(input: $input)
      }
    `;
    this.apollo.watch(query, variables);
  }*/

  login(input: any):void{
    const variables = { input: input };
    const query = gql`
      query login($input: userInput!) {
        login(input: $input) {
          ...userFragment
        }
      }
      ${UserService.getFragment()}
    `;
    this.apollo.watch(query, variables).subscribe((data) => {
      this.subject.next(new User().deserialize(data.login));
    });
  }
}
