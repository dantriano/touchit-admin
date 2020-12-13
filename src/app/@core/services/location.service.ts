import { Injectable } from "@angular/core";
import { ApolloService } from "./apollo.service";
import gql from "graphql-tag";
import { Location } from "app/@core/models";
import { Service } from "./service";

@Injectable({ providedIn: "root" })
export class LocationService extends Service {
  constructor(protected apollo: ApolloService) {
    super(apollo);
  }
  converToModel(x) {
    return new Location().deserialize(x);
  }
  toModel = this.converToModel;
  saveQuery = gql`
    mutation saveLocation($input: locationInput) {
      saveLocation(input: $input)
    }
  `;
  removeQuery = gql`
    mutation removeLocation($input: locationInput!) {
      removeLocation(input: $input)
    }
  `;
  oneQuery = gql`
    query($input: locationInput!) {
      location(input: $input) {
        ...LocationFragment
      }
    }
  `;
  listQuery = gql`
    query locations($input: locationInput) {
      locations(input: $input) {
        ...LocationFragment
      }
    }
  `;
  fragment = gql`
    fragment locationFragment on Location {
      __typename
      _id
      name
      center {
        lat
        lng
      }
      zones {
        latsLngs {
          lat
          lng
        }
      }
    }
  `;
}
