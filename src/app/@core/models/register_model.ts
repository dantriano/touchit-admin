import { Injectable } from '@angular/core';
import { LocationData, Location } from '../data/location';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { ConfigurationModel } from './configuration.model';

@Injectable()
export class LocationModel extends LocationData {
  private _locations: Location[] = [];
  private _location: Location;
  constructor(private apollo: Apollo) {
    super();
  }
  set location(location: Location) { this._location = location }
  get location() { return this._location }
  set locations(locations: Location[]) { this._locations = locations }
  get locations() { return this._locations }

  load(input: any) {
    const configInput = ConfigurationModel.getInputById('locationOptions');
    const configFragment = ConfigurationModel.getFragment();
    const location = {}
    const query = gql`
    query($configuration:configurationsInput!,$location:locationInput){
      configuration(input:$configuration) {
        ... configFragment
      }
      location(input:$location)  {
        _id
        name
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
    }${configFragment}
    `;
    return this.apollo
      .watchQuery<any>({
        query: query,
        variables: { 'activity': input, 'configuration': configInput, 'location': location },
        fetchPolicy: 'network-only'
      }).valueChanges;
  }
  getList(input: object) {
    const query = gql`
    query locations($input:locationInput){
      locations(input:$input) {
        _id
        name
      }
    }
    `;
    return this.apollo
      .watchQuery<any>({
        query: query,
        variables: { 'input': input },
        fetchPolicy: 'network-only'
      }).valueChanges;
  }

  getOne(input: object) {
    const query = gql`
    query($input:locationInput!){
      location(input:$input) {
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
        variables: { 'input': input },
        fetchPolicy: 'network-only'
      }).valueChanges;
  }

  save(input: Location) {
    console.log(input)
    const mutation = gql`
      mutation saveLocation($input:locationInput){
        saveLocation(input: $input)
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
    mutation removeLocation($id: ID!) {
      removeLocation(_id: $id)
    }
    `;
    return this.apollo
      .mutate<any>({
        mutation: mutation,
        variables: { 'id': id }
      });
  }
  static getFragment() {
    return gql`
    fragment location on Location{
      _id
      name
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
    `;
  }

}
