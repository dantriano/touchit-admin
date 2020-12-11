import { Injectable } from "@angular/core";
import { ApolloService } from "./apollo.service";

import gql from "graphql-tag";
import { Observable, BehaviorSubject, of } from "rxjs";
import { Configuration } from "app/@core/models";

@Injectable({ providedIn: "root" })
export class ConfigurationService {
  constructor(private apollo: ApolloService) {}
  private subject = new BehaviorSubject<Configuration>(null);
  private subjectList = new BehaviorSubject<Configuration[]>([]);
  get configuration(): Observable<Configuration> {
    return this.subject.asObservable();
  }
  get configurations(): Observable<Configuration[]> {
    return this.subjectList.asObservable();
  }
  set(configuration: Configuration) {
    this.subject.next(configuration);
  }
  setAll(configurations: Configuration[]) {
    this.subjectList.next(configurations);
  }
  private _types = {
    locationOptions: "locationOptions",
    activityOptions: "activityOptions",
  };
  getType(type: string) {
    return this._types[type];
  }
  static getInputById(id) {
    return { id: id, status: "active" };
  }

  public getFragment = gql`
    fragment configFragment on Configuration {
      __typename
      _id
      type
      name
      desc
      status
      companies
      value {
        name
        sections
        status
      }
    }
  `;

  getOne(input: any): Observable<any> {
    const variables = { input: input };
    const query = gql`
      query($input: configurationInput) {
        configuration(input: $input) {
          ...configFragment
        }
      }
      ${this.getFragment}
    `;
    const watch = this.apollo.watch(query, variables).subscribe((data) => {
      this.set(new Configuration().deserialize(data.configuration));
    });
    return of(watch);
  }

  getList(input: any): Observable<any> {
    const variables = { input: input };
    const query = gql`
      query configurations($input: configurationInput) {
        configurations(input: $input) {
          ...configFragment
        }
      }
      ${this.getFragment}
    `;
    const watch = this.apollo.watch(query, variables).subscribe((data) => {
      const result = data.configurations.map((x) =>
        new Configuration().deserialize(x)
      );
      this.setAll(result);
    });
    return of(watch);
  }

  save(input: any) {
    const variables = { input: input };
    const mutation = gql`
      mutation saveConfiguration($input: configurationInput!) {
        saveConfiguration(input: $input)
      }
    `;
    return this.apollo.mutation(mutation, variables);
  }
  remove(id: string) {
    const variables = { id: id };
    const mutation = gql`
      mutation removeConfiguration($id: ID!) {
        removeConfiguration(_id: $id)
      }
    `;
    return this.apollo.mutation(mutation, variables);
  }
  /*load(input: any) {
    const configurationInput = {};
    const companyInput = {};
    const query = gql`
      query(
        $configurationInput: configurationInput
        $companyInput: companyInput
      ) {
        configuration(input: $configurationInput) {
          ...configFragment
        }
        companies(input: $companyInput) {
          ...companyFragment
        }
      }
      ${ConfigurationService.getFragment()}
      ${CompanyService.getFragment()}
    `;
    return this.apollo.watchQuery<any>({
      query: query,
      variables: {
        configurationInput: configurationInput,
        companyInput: companyInput,
      },
      fetchPolicy: "network-only",
    }).valueChanges;
  }

  getList(input: any) {
    const configInput = { companies: [input.company] };
    const configFragment = ConfigurationService.getFragment();
    const query = gql`
      query configurations($input: configurationInput) {
        configurations(input: $input) {
          ...configFragment
        }
      }
      ${configFragment}
    `;
    return this.apollo.watchQuery<any>({
      query: query,
      variables: { input: configInput },
      fetchPolicy: "network-only",
    }).valueChanges;
  }*/
}
