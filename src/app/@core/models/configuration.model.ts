import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';
import { ConfigurationData } from '../data/configuration';

@Injectable()
export class ConfigurationModel extends ConfigurationData {
  private _types = {
    'locationOptions': 'locationOptions',
    'activityOptions': 'activityOptions'
  }
  constructor(private apollo: Apollo) {
    super();
  }
  getType(type: string) {
    return this._types[type];
  }
  static getInputById(id) {
    return { 'id': id, 'status':'active' }
  }
  static getFragment() {
    return gql`
    fragment configFragment on Configuration {
        __typename
        id
        type
        status
        value{
          _id
          desc
          status
        }
    }
  `;
  }
  get(input: Object) {
    const query = gql`
    query($input:configurationsInput){
      configuration(input:$input) {
          id
          type
          status
          value{
            id
            desc
            status
          }
      }
    }
    `;
    return this.apollo
      .watchQuery<any>({
        query: query,
        variables: { input: input },
      }).valueChanges;
  }
}
