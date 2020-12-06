import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { ConfigurationModel } from './configuration.model';
import { RegisterData } from '../data';
import { ActivityModel } from './activity.model';
import { EmployeeModel } from './employee.model';

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

  static getFragment() {
    return gql`
    fragment registerFragment on Register{
      __typename
      _id
      activity
      employee
      start
      end
      inPosition
      location{
        lat
        lng
      }
      delay
      _employee{
        firstName
        lastName
      }
      _activity{
        name
      }
    }
    `;
  }
  load(input: any) {
    const configFragment = ConfigurationModel.getFragment();
    const activityFragment = ActivityModel.getFragment();
    const employeeFragment = EmployeeModel.getFragment();
    const registerFragment = RegisterModel.getFragment();

    const configInput = {'id': 'registerOptions', 'status':'active','company':input.company }
    const activityInput = {'company':input.company}
    const employeeInput = {'company':input.company}
    const query = gql`
      query($register:registerInput,$activity:activityInput,$employee:employeeInput,$configuration:configurationsInput){
        register(input:$register)  {
          ... registerFragment  
        }
        configuration(input:$configuration) {
          ... configFragment
        }
        activities(input:$activity) {
          ... activityFragment
        }
        employees(input:$employee) {
          ... employeeFragment
        }
      }
      ${registerFragment}
      ${configFragment}
      ${activityFragment}
      ${employeeFragment}
    `;
    return this.apollo
      .watchQuery<any>({
        query: query,
        variables: { 'register': input,'configuration': configInput,'activity': activityInput,'employee': employeeInput },
        fetchPolicy: 'network-only'
      }).valueChanges;
  }
  getList(input: object) {
    const registerFragment = RegisterModel.getFragment();
    const query = gql`
    query($register:registerInput){
      registers(input:$register)  {
        ... registerFragment  
      }
    }
    ${registerFragment}
    `;
    return this.apollo
      .watchQuery<any>({
        query: query,
        variables: { 'register': input },
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

}
