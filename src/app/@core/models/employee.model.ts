import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { EmployeeData, Employee } from '../data';
import { ConfigurationModel } from './configuration.model';

@Injectable()
export class EmployeeModel extends EmployeeData {
  constructor(private apollo: Apollo) {
    super();
  }
  generateCode() {
    var length = 4;
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  static getFragment() {
    return gql`
    fragment employeeFragment on Employee{
      _id
        email
        firstName
        lastName
        groups
        options
        mainActivity{
          _id
          status
        }
        customActivities{
          _id
          status
        }
    		linkCode
    		isLinked
  }
    `;
  }
  getOne(input: any) {
    const query = gql`
    query employee($input:employeeInput){
      employee(input:$input) {
        _id
        firstName
        email
      }
    }
    `;
    return this.apollo
      .watchQuery<any>({
        query: query,
        variables: { 'input': input},
        fetchPolicy: 'network-only'
      }).valueChanges;
  }
  getList() {
    const query = gql`
    query employees($input:employeeInput){
      employees(input:$input) {
        _id
        avatar
        employeeCode
        firstName
        lastName
        status
      }
    }
    `;

    return this.apollo
      .watchQuery<any>({
        query: query,
        fetchPolicy: 'network-only'
      }).valueChanges;
  }
  load(input: any) {
    const employeeFragment= EmployeeModel.getFragment();
    const configInput = ConfigurationModel.getInputById('groupOptions');
    const configFragment = ConfigurationModel.getFragment();
    const activityInput = {}
    const groupInput = {}
    const query = gql`
    query($input:employeeInput,$configuration:configurationsInput!){
      activities {
        _id
        name
      }
  		groups{
        _id
        name
      }
      configuration(input:$configuration) {
        ... configFragment
      }
      employee(input:$input)  {
        ... employeeFragment
      }
    }
    ${employeeFragment}
    ${configFragment}
    `;
    return this.apollo
      .watchQuery<any>({
        query: query,
        variables: { 'input': input, 'configuration': configInput },
        fetchPolicy: 'network-only'
      }).valueChanges;
  }
  save(input: Employee) {
    const mutation = gql`
    mutation saveEmplyee($input:employeeInput!){
      saveEmployee(input: $input)
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
    mutation removeEmployee($id: ID!) {
      removeEmployee(_id: $id)
    }
    `;
    return this.apollo
      .mutate<any>({
        mutation: mutation,
        variables: { 'id': id }
      });
  }

}
