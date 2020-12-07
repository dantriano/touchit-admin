import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { EmployeeData, Employee } from "../data";
import { ActivityModel } from "./activity.model";
import { ConfigurationModel } from "./configuration.model";
import { GroupModel } from "./group.model";

@Injectable()
export class EmployeeModel extends EmployeeData {
  constructor(private apollo: Apollo) {
    super();
  }
  static getFragment() {
    return gql`
      fragment employeeFragment on Employee {
        __typename
        _id
        email
        firstName
        lastName
        groups
        _groups {
          name
          activities
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
    `;
  }
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
  getOne(input: any) {
    const query = gql`
      query employee($input: employeeInput) {
        employee(input: $input) {
          _id
          firstName
          email
        }
      }
    `;
    return this.apollo.watchQuery<any>({
      query: query,
      variables: { input: input },
      fetchPolicy: "network-only",
    }).valueChanges;
  }
  getList(input: any) {
    const query = gql`
      query employees($input: employeeInput) {
        employees(input: $input) {
          _id
          avatar
          employeeCode
          firstName
          lastName
          _groups {
            name
          }
          status
        }
      }
    `;

    return this.apollo.watchQuery<any>({
      query: query,
      variables: { input: input },
      fetchPolicy: "network-only",
    }).valueChanges;
  }
  load(input: any) {
    const employeeFragment = EmployeeModel.getFragment();
    const configFragment = ConfigurationModel.getFragment();
    const activityFragment = ActivityModel.getFragment();
    const groupFragment = GroupModel.getFragment();

    const groupInput = { company: input.company };
    const activityInput = { company: input.company };
    const configInput = {
      status: "active",
      companies: input.company,
      //value: { sections: "employeeOptions" },
    };
    const query = gql`
      query(
        $input: employeeInput
        $configuration: configurationInput!
        $activity: activityInput
        $group: groupInput
      ) {
        employee(input: $input) {
          ...employeeFragment
        }
        activities(input: $activity) {
          ...activityFragment
        }
        groups(input: $group) {
          ...groupFragment
        }
        configuration(input: $configuration) {
          ...configFragment
        }
      }
      ${employeeFragment}
      ${activityFragment}
      ${groupFragment}
      ${configFragment}
    `;
    return this.apollo.watchQuery<any>({
      query: query,
      variables: {
        input: input,
        activity: activityInput,
        group: groupInput,
        configuration: configInput,
      },
      fetchPolicy: "network-only",
    }).valueChanges;
  }
  save(input: Employee) {
    const mutation = gql`
      mutation saveEmplyee($input: employeeInput!) {
        saveEmployee(input: $input)
      }
    `;
    return this.apollo.mutate<any>({
      mutation: mutation,
      variables: { input: input },
    });
  }
  remove(id: string) {
    const mutation = gql`
      mutation removeEmployee($id: ID!) {
        removeEmployee(_id: $id)
      }
    `;
    return this.apollo.mutate<any>({
      mutation: mutation,
      variables: { id: id },
    });
  }
}
