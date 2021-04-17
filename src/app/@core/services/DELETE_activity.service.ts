import { Injectable } from "@angular/core";
import { ApolloService } from "./apollo.service";
import gql from "graphql-tag";
import { Activity } from "app/@core/models";
import { Service } from "./service";

@Injectable({ providedIn: "root" })
export class ActivityService extends Service {
  constructor(protected apollo: ApolloService) {
    super(apollo);
    this.fragment = ActivityService.fragment;
  }
  converToModel(x) {
    return new Activity().deserialize(x);
  }
  toModel = this.converToModel;
  saveQuery = gql`
    mutation saveActivity($input: activityInput!) {
      saveActivity(input: $input)
    }
  `;
  removeQuery = gql`
    mutation removeActivity($input: activityInput!) {
      removeActivity(input: $input)
    }
  `;
  oneQuery = gql`
    query activity($input: activityInput) {
      activity(input: $input) {
        ...activityFragment
      }
    }
  `;
  listQuery = gql`
    query activities($input: activityInput) {
      activities(input: $input) {
        ...activityFragment
      }
    }
  `;
  static fragment = gql`
    fragment activityFragment on Activity {
      __typename
      _id
      name
      options
      startFrom
      startTo
      duration
      days
      locations
      _locations {
        name
      }
    }
  `;
}
