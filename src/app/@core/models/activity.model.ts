import { Injectable } from '@angular/core';
import { ActivityData, Activity } from '../data/activity';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { ConfigurationModel } from './configuration.model';
import { LocationModel } from './location.model';

@Injectable()
export class ActivityModel extends ActivityData {
  constructor(private apollo: Apollo) {
    super();
  }
  static getFragment() {
    return gql`
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
    }
  `;
  }
  getList(input:object) {
    const query = gql`
    query activities($input:activityInput){
      activities(input:$input) {
        _id
        name
        _locations{
          name
        }
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
  getOne(input:any) {
    const activityFragment = ActivityModel.getFragment();
    const query = gql`
    query activity($input:activityInput){
      activity(input:$input) {
        ... activityFragment
      }
    }
    ${activityFragment}
    `;
    return this.apollo
      .watchQuery<any>({
        query: query,
        variables: { 'input': input },
        fetchPolicy: 'network-only'
      }).valueChanges;
  }
  load(input: any) {
    const activityFragment = ActivityModel.getFragment();
    const configFragment = ConfigurationModel.getFragment();
    const locationFragment = LocationModel.getFragment();
    const locationInput = {'company':input.company}
    const configInput = {'id': 'activityOptions', 'status':'active','company':input.company }
    const query = gql`
    query($activity:activityInput,$configuration:configurationsInput!,$location:locationInput){
      activity(input:$activity) {
        ... activityFragment
      }
      configuration(input:$configuration) {
        ... configFragment
      }
      locations(input:$location)  {
        ...locationFragment
      }
    }
    ${activityFragment}
    ${locationFragment}
    ${configFragment}
    `;
    return this.apollo
      .watchQuery<any>({
        query: query,
        variables: { 'activity': input, 'configuration': configInput, 'location': locationInput },
        fetchPolicy: 'network-only'
      }).valueChanges;
  }
  save(input: Activity) {
    const mutation = gql`
    mutation saveActivity($input:activityInput!){
      saveActivity(input: $input)
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
    mutation removeActivity($id: ID!) {
      removeActivity(_id: $id)
    }
    `;
    return this.apollo
      .mutate<any>({
        mutation: mutation,
        variables: { 'id': id }
      });
  }

}
