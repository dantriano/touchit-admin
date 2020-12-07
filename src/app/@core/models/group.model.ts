import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { ActivityModel } from "./activity.model";
import { GroupData, Group } from "../data";
import { ConfigurationModel } from "./configuration.model";

@Injectable()
export class GroupModel extends GroupData {
  constructor(private apollo: Apollo) {
    super();
  }
  getOne(input: any) {
    console.log(input);
    const query = gql`
      query group($input: groupInput) {
        group(input: $input) {
          _id
        }
      }
    `;
    return this.apollo.watchQuery<any>({
      query: query,
      variables: { input: input },
      fetchPolicy: "network-only",
    }).valueChanges;
  }
  getList(input: object) {
    const query = gql`
      query groups($input: groupInput) {
        groups(input: $input) {
          _id
          name
          activities
          _activities {
            name
          }
          options
        }
      }
    `;
    return this.apollo.watchQuery<any>({
      query: query,
      variables: { input: input },
      fetchPolicy: "network-only",
    }).valueChanges;
  }
  static getFragment() {
    return gql`
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
  load(input: any) {
    const configFragment = ConfigurationModel.getFragment();
    const groupFragment = GroupModel.getFragment();
    const activityFragment = ActivityModel.getFragment();
    const activityInput = { company: input.company };
    const configInput = {
      status: "active",
      companies: input.company,
      //value: { sections: "groupOptions" },
    };
    const query = gql`
      query(
        $input: groupInput
        $configuration: configurationInput!
        $activity: activityInput
      ) {
        group(input: $input) {
          ...groupFragment
        }
        activities(input: $activity) {
          ...activityFragment
        }
        configuration(input: $configuration) {
          ...configFragment
        }
      }
      ${groupFragment}
      ${activityFragment}
      ${configFragment}
    `;
    return this.apollo.watchQuery<any>({
      query: query,
      variables: {
        input: input,
        configuration: configInput,
        activity: activityInput,
      },
      fetchPolicy: "network-only",
    }).valueChanges;
  }
  save(input: Group) {
    const mutation = gql`
      mutation saveGroup($input: groupInput!) {
        saveGroup(input: $input)
      }
    `;
    return this.apollo.mutate<any>({
      mutation: mutation,
      variables: { input: input },
    });
  }
  remove(id: string) {
    const mutation = gql`
      mutation removeGroup($id: ID!) {
        removeGroup(_id: $id)
      }
    `;
    return this.apollo.mutate<any>({
      mutation: mutation,
      variables: { id: id },
    });
  }
}
