import { Injectable } from "@angular/core";
import { ApolloService } from "./apollo.service";
import gql from "graphql-tag";
import { Schedule } from "app/@core/models";
import { Service } from "./service";

@Injectable({ providedIn: "root" })
export class ScheduleService extends Service {
  constructor(protected apollo: ApolloService) {
    super(apollo);
    this.fragment = ScheduleService.fragment;
  }
  converToModel(x) {
    return new Schedule().deserialize(x);
  }
  toModel = this.converToModel;
  saveQuery = gql`
    mutation saveSchedule($input: scheduleInput!) {
      saveSchedule(input: $input)
    }
  `;
  removeQuery = gql`
    mutation removeSchedule($input: scheduleInput!) {
      removeSchedule(input: $input)
    }
  `;
  oneQuery = gql`
    query schedule($input: scheduleInput) {
      schedule(input: $input) {
        ...scheduleFragment
      }
    }
  `;
  listQuery = gql`
    query schedules($input: scheduleInput) {
      schedules(input: $input) {
        ...scheduleFragment
      }
    }
  `;
  static fragment = gql`
    fragment scheduleFragment on Schedule {
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
