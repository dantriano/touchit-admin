import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { GroupData, Group } from '../data';
import { ConfigurationModel } from './configuration.model';

@Injectable()
export class GroupModel extends GroupData {
  constructor(private apollo: Apollo) {
    super();
  }
  getOne(input: any) {
    console.log(input)
    const query = gql`
    query group($input:groupInput){
      group(input:$input) {
        _id
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
    query groups($input:groupInput){
      groups(input:$input) {
        _id
        name
        options
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
    const configInput = ConfigurationModel.getInputById('groupOptions');
    const configFragment = ConfigurationModel.getFragment();
    const activityInput = {}
    const query = gql`
    query($input:groupInput,$configuration:configurationsInput!,$activity:activityInput){
      activities(input:$activity) {
        _id
        name
      }
      configuration(input:$configuration) {
        ... configFragment
      }
      group(input:$input)  {
        _id
        name
        options
        main
        activities
      }
    }
    ${configFragment}
    `;
    return this.apollo
      .watchQuery<any>({
        query: query,
        variables: { 'input': input, 'configuration': configInput, 'activity': activityInput },
        fetchPolicy: 'network-only'
      }).valueChanges;
  }
  save(input: Group) {
    const mutation = gql`
    mutation saveGroup($input:groupInput!){
      saveGroup(input: $input)
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
    mutation removeGroup($id: ID!) {
      removeGroup(_id: $id)
    }
    `;
    return this.apollo
      .mutate<any>({
        mutation: mutation,
        variables: { 'id': id }
      });
  }

}
