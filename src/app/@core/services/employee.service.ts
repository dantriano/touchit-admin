import { Injectable } from "@angular/core";
import { ApolloService } from "./apollo.service";
import gql from "graphql-tag";
import { Employee } from "../models/employee.model";
import { Service } from "./service";
import { GroupService } from "./group.service";

@Injectable({ providedIn: "root" })
export class EmployeeService extends Service {
  constructor(protected apollo: ApolloService) {
    super(apollo);
    this.fragment = EmployeeService.fragment;
  }
  converToModel(x) {
    return new Employee().deserialize(x);
  }
  toModel = this.converToModel;
  saveQuery = gql`
    mutation saveEmplyee($input: employeeInput!) {
      saveEmployee(input: $input)
    }
  `;
  removeQuery = gql`
    mutation removeEmployee($input: employeeInput!) {
      removeEmployee(input: $input)
    }
  `;
  oneQuery = gql`
    query employee($input: employeeInput) {
      employee(input: $input) {
        ...employeeFragment
      }
    }
  `;
  listQuery = gql`
    query employee($input: employeeInput) {
      employees(input: $input) {
        ...employeeFragment
      }
    }
  `;
  static fragment = gql`
    fragment employeeFragment on Employee {
      __typename
      _id
      email
      firstName
      lastName
      groups
      _groups {
        ...groupFragment
      }
      options
      mainActivity
      customActivities {
        _id
        status
      }
      linkCode
      isLinked
    }
    ${GroupService.fragment}
  `;
  generateCode() {
    var length = 4;
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
