import { Injectable } from "@angular/core";
import { ApolloService } from "./apollo.service";

import gql from "graphql-tag";
import { Observable, BehaviorSubject, of } from "rxjs";
import { Group } from "app/@core/models";

@Injectable({ providedIn: "root" })
export class GroupService {
  constructor(private apollo: ApolloService) {}
  private subject = new BehaviorSubject<Group>(null);
  private subjectList = new BehaviorSubject<Group[]>([]);
  get group(): Observable<Group> {
    return this.subject.asObservable();
  }
  get groups(): Observable<Group[]> {
    return this.subjectList.asObservable();
  }
  set(group: Group) {
    this.subject.next(group);
  }
  setAll(groups: Group[]) {
    this.subjectList.next(groups);
  }
  public getFragment = gql`
    fragment groupFragment on Group {
      __typename
      _id
      name
      options
      main
      activities
    }
  `;

  getOne(input: any): Observable<any> {
    const variables = { input: input };
    const query = gql`
      query group($input: groupInput) {
        group(input: $input) {
          ...groupFragment
        }
      }
      ${this.getFragment}
    `;
    const watch = this.apollo.watch(query, variables).subscribe((data) => {
      this.set(new Group().deserialize(data.group));
    });
    return of(watch);
  }
  getList(input: any): Observable<any> {
    const variables = { input: input };
    const query = gql`
      query groups($input: groupInput) {
        groups(input: $input) {
          ...groupFragment
        }
      }
      ${this.getFragment}
    `;
    const watch = this.apollo.watch(query, variables).subscribe((data) => {
      const result = data.groups.map((x) => new Group().deserialize(x));
      this.setAll(result);
    });
    return of(watch);
  }
  save(input: any) {
    const variables = { input: input };
    const mutation = gql`
      mutation saveGroup($input: groupInput!) {
        saveGroup(input: $input)
      }
    `;
    return this.apollo.mutation(mutation, variables);
  }
  remove(id: string) {
    const variables = { id: id };
    const mutation = gql`
      mutation removeGroup($id: ID!) {
        removeGroup(_id: $id)
      }
    `;
    return this.apollo.mutation(mutation, variables);
  }
  /* load(input: any) {
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
      ${GroupService.getFragment()}
      ${ActivityService.getFragment()}
      ${ConfigurationService.getFragment()}
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
  }*/
}
