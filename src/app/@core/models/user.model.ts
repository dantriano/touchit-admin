import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { ConfigurationModel } from './configuration.model';
import { UserData, User } from '../data';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UserModel extends UserData {
  //private currentUserSubject= new BehaviorSubject<User>({});
  //public currentUser= this.currentUserSubject.asObservable();
  constructor(private apollo: Apollo) {
    super();
    //this.currentUserSubject.next = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    //this.currentUser = this.currentUserSubject.asObservable();
  }
  getOne(input: any) {
    const query = gql`
    query user($input:userInput!){
      user(input:$input) {
        _id
        firstName
        employee
        company
        _employee{
          _id
        }
        _company{
          _id
        }
      }
    }
    `;
    return this.apollo
      .watchQuery<any>({
        query: query,
        variables: { 'input': input },
        fetchPolicy: 'network-only'
      }).valueChanges;
  }
  getList() { }
  load(input: any) { }

  save(input: User) {
    const mutation = gql`
    mutation saveUser($input:userInput!){
      saveUser(input: $input)
    }
    `;
    return this.apollo
      .mutate<any>({
        mutation: mutation,
        variables: { 'input': input },
      })
  }
  remove(id: string) {
    const mutation = gql`
    mutation removeUser($id: ID!) {
      removeUser(_id: $id)
    }
    `;
    return this.apollo
      .mutate<any>({
        mutation: mutation,
        variables: { 'id': id }
      });
  }
  token(input: any) {
    console.log(input)
    const query = gql`
    query token($input: userInput!) {
      token(input:$input)
      }
    `;
        
    return this.apollo
      .watchQuery<any>({
        query: query,
        variables: { 'input': input },
        fetchPolicy: 'network-only'
      }).valueChanges;
  }
  login(input: any) {
    const query = gql`
        query login($input: userInput!) {
            login(input:$input) {
                _id
                firstName
                lastName
                picture
                email
                _company{
                  _id
                  name
                }
                _employee{
                  _id
                  firstName
                }
                token
            }
        }
        `;
        
    return this.apollo
      .watchQuery<any>({
        query: query,
        variables: { 'input': input },
        fetchPolicy: 'network-only'
      }).valueChanges;
  }
 /* login2(input: any) {
    const query = gql`
        query login($input: userInput!) {
            login(input:$input) {
                _id
                firstName
                lastName
                picture
                token
                email
            }
        }
        `;
    return this.apollo
      .watchQuery<any>({
        query: query,
        variables: { 'input': input },
      })
      .valueChanges.pipe(map(({ data }) => {
        localStorage.setItem('currentUser', JSON.stringify(data.login));
        this.currentUserSubject.next(data.login);
      }));
  }*/
}
