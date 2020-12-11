import { Injectable } from "@angular/core";
import { ApolloService } from "./apollo.service";

import gql from "graphql-tag";
import { Observable, BehaviorSubject, of } from "rxjs";
import { Location } from "app/@core/models";

@Injectable({ providedIn: "root" })
export class LocationService {
  constructor(private apollo: ApolloService) {}
  private subject = new BehaviorSubject<Location>(null);
  private subjectList = new BehaviorSubject<Location[]>([]);
  get location(): Observable<Location> {
    return this.subject.asObservable();
  }
  get locations(): Observable<Location[]> {
    return this.subjectList.asObservable();
  }
  set(location: Location) {
    this.subject.next(location);
  }
  setAll(locations: Location[]) {
    this.subjectList.next(locations);
  }
  public getFragment = gql`
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

  getOne(input: any): Observable<any> {
    const variables = { input: input };
    const query = gql`
      query($input: locationInput!) {
        location(input: $input) {
          ...LocationFragment
        }
      }
      ${this.getFragment}
    `;
    const watch = this.apollo.watch(query, variables).subscribe((data) => {
      this.set(new Location().deserialize(data.location));
    });
    return of(watch);
  }
  getList(input: any): Observable<any> {
    const variables = { input: input };
    const query = gql`
      query locations($input: locationInput) {
        locations(input: $input) {
          ...LocationFragment
        }
      }
      ${this.getFragment}
    `;
    const watch = this.apollo.watch(query, variables).subscribe((data) => {
      const result = data.locations.map((x) => new Location().deserialize(x));
      this.setAll(result);
    });
    return of(watch);
  }

  save(input: any) {
    const variables = { input: input };
    const mutation = gql`
      mutation saveLocation($input: locationInput) {
        saveLocation(input: $input)
      }
    `;
    return this.apollo.mutation(mutation, variables);
  }
  remove(id: string) {
    const variables = { id: id };
    const mutation = gql`
      mutation removeLocation($id: ID!) {
        removeLocation(_id: $id)
      }
    `;
    return this.apollo.mutation(mutation, variables);
  }

  /*load(input: any) {
    const configInput = {
      status: "active",
      companies: input.company,
      //value: { sections: "locationOptions" },
    };
    const location = {};
    const query = gql`
      query($configuration: configurationInput!, $location: locationInput) {
        configuration(input: $configuration) {
          ...configFragment
        }
        location(input: $location) {
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
      }
      ${ConfigurationService.getFragment()}
    `;
    return this.apollo.watchQuery<any>({
      query: query,
      variables: { configuration: configInput, location: input },
      fetchPolicy: "network-only",
    }).valueChanges;
  }*/
}
