import { Injectable } from "@angular/core";
import { ApolloService } from "./apollo.service";

import gql from "graphql-tag";
import { Observable, BehaviorSubject, of } from "rxjs";
import { Activity } from "app/@core/models";

@Injectable({ providedIn: "root" })
export class ActivityService {
  constructor(private apollo: ApolloService) {}
  private subject = new BehaviorSubject<Activity>(null);
  private subjectList = new BehaviorSubject<Activity[]>([]);
  get activity(): Observable<Activity> {
    return this.subject.asObservable();
  }
  get activities(): Observable<Activity[]> {
    return this.subjectList.asObservable();
  }
  set(activity: Activity) {
    this.subject.next(activity);
  }
  setAll(activities: Activity[]) {
    this.subjectList.next(activities);
  }
  public getFragment=gql`
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
  getOne(input: any): Observable<any> {
    const variables = { input: input };
    const query = gql`
      query activity($input: activityInput) {
        activity(input: $input) {
          ...activityFragment
        }
      }
      ${this.getFragment}
    `;
    const watch = this.apollo.watch(query, variables).subscribe((data) => {
      this.set(new Activity().deserialize(data.activity));
    });
    return of(watch);
  }
  getList(input: any): Observable<any> {
    const variables = { input: input };
    const query = gql`
      query activities($input: activityInput) {
        activities(input: $input) {
          ...activityFragment
        }
      }
      ${this.getFragment}
    `;
    const watch = this.apollo.watch(query, variables).subscribe((data) => {
      const result = data.activities.map((x) => new Activity().deserialize(x));
      this.setAll(result);
    });
    return of(watch);
  }
  /*
  load(input: any) {
    const locationInput = { company: input.company };

    const configInput = {
      status: "active",
      companies: input.company,
      //value: { sections: "WORKERTIME" },
    };

    const query = gql`
      query(
        $activity: activityInput
        $configuration: configurationInput!
        $location: locationInput
      ) {
        activity(input: $activity) {
          ...activityFragment
        }
        configuration(input: $configuration) {
          ...configFragment
        }
        locations(input: $location) {
          ...locationFragment
        }
      }
      ${ActivityService.getFragment()}
      ${LocationService.getFragment()}
      ${ConfigurationService.getFragment()}
    `;
    return this.apollo.watchQuery<any>({
      query: query,
      variables: {
        activity: input,
        configuration: configInput,
        location: locationInput,
      },
      fetchPolicy: "network-only",
    }).valueChanges;
  }
  */
  save(input: any) {
    const variables = { input: input };
    const mutation = gql`
      mutation saveActivity($input: activityInput!) {
        saveActivity(input: $input)
      }
    `;
    return this.apollo.mutation(mutation, variables);
  }
  remove(id: string) {
    const variables = { id: id };
    const mutation = gql`
      mutation removeActivity($id: ID!) {
        removeActivity(_id: $id)
      }
    `;
    return this.apollo.mutation(mutation, variables);
  }
}
