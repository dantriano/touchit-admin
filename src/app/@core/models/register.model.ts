import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { ConfigurationModel } from './configuration.model';
import { RegisterData } from '../data';

@Injectable()
export class RegisterModel extends RegisterData {
  private _locations: Location[] = [];
  private _location: Location;
  constructor(private apollo: Apollo) {
    super();
  }
  set location(location: Location) { this._location = location }
  get location() { return this._location }
  set locations(locations: Location[]) { this._locations = locations }
  get locations() { return this._locations }


  load(registerInput: any) {
    const activityInput={}
    const employeeInput={}
    const configInput = ConfigurationModel.getInputById('registerOptions');
    const configFragment = ConfigurationModel.getFragment();
    const location = {}
    const query = gql`
    query($register:registerInput,$activity:activityInput,$employee:employeeInput){
      register(input:$register)  {
        _id
        activity
        employee
        _employee{
          firstName
        }
      }
      activities(input:$activity) {
        _id
        name
      }
      employees(input:$employee) {
        _id
        firstName
      }
    }
    `;
    return this.apollo
      .watchQuery<any>({
        query: query,
        variables: { 'register': registerInput,'activity': activityInput,'employee': employeeInput },
        fetchPolicy: 'network-only'
      }).valueChanges;
  }
  getList(register: object) {
   
    const query = gql`
    query($register:registerInput){
      registers(input:$register) {
        _id
      }
    }
    `;
    return this.apollo
      .watchQuery<any>({
        query: query,
        variables: { 'register': register },
        fetchPolicy: 'network-only'
      }).valueChanges;
  }

  getOne(register: object) {
    const query = gql`
    query($register:registerInput!){
      register(input:$register) {
        _id
        name
        options
        center{
          lat
          lng
        }
        zones{
          name
          latsLngs{
            lat
            lng
          }
        }
      }
    }
    `;
    return this.apollo
      .watchQuery<any>({
        query: query,
        variables: { 'register': register },
        fetchPolicy: 'network-only'
      }).valueChanges;
  }

  save(register: Location) {
    console.log(register)
    const mutation = gql`
      mutation saveRegister($register:registerInput!){
        saveRegister(input: $register)
      }
      `;
    return this.apollo
      .mutate<any>({
        mutation: mutation,
        variables: { 'register': register },
      })
  }

  remove(id: string) {
    const mutation = gql`
    mutation removeRegister($id: ID!) {
      removeRegister(_id: $id)
    }
    `;
    return this.apollo
      .mutate<any>({
        mutation: mutation,
        variables: { 'id': id }
      });
  }
  static getFragment() {
    return gql`
    fragment register on Register{
      _id
    }
    `;
  }

}
