import { Injectable } from "@angular/core";
import { ApolloService } from "./apollo.service";

import gql from "graphql-tag";
import { Observable, BehaviorSubject, of } from "rxjs";
import { Register } from "app/@core/models";

@Injectable({ providedIn: "root" })
export class RegisterService {
  constructor(protected apollo: ApolloService) {}
  private subject = new BehaviorSubject<Register>(null);
  private subjectList = new BehaviorSubject<Register[]>([]);
  get register(): Observable<Register> {
    return this.subject.asObservable();
  }
  get registers(): Observable<Register[]> {
    return this.subjectList.asObservable();
  }
  set(register: Register) {
    this.subject.next(register);
  }
  setAll(registers: Register[]) {
    this.subjectList.next(registers);
  }
  public getFragment = gql`
    fragment registerFragment on Register {
      __typename
      _id
      activity
      employee
      start
      end
      inPosition
      location {
        lat
        lng
      }
      delay
      _employee {
        firstName
        lastName
      }
      _activity {
        name
      }
    }
  `;

  getOne(input: any): Observable<any> {
    const variables = { input: input };
    const query = gql`
      query($register: registerInput!) {
        register(input: $register) {
          ...registerFragment
        }
      }
      ${this.getFragment}
    `;
    const watch = this.apollo.watch(query, variables).subscribe((data) => {
      this.set(new Register().deserialize(data.register));
    });
    return of(watch);
  }

  getList(input: any): Observable<any> {
    const variables = { input: input };
    const query = gql`
      query($register: registerInput) {
        registers(input: $register) {
          ...registerFragment
        }
      }
      ${this.getFragment}
    `;
    const watch = this.apollo.watch(query, variables).subscribe((data) => {
      const result = data.registers.map((x) => new Register().deserialize(x));
      this.setAll(result);
    });
    return of(watch);
  }

  save(input: any) {
    const variables = { input: input };
    const mutation = gql`
      mutation saveRegister($register: registerInput!) {
        saveRegister(input: $register)
      }
    `;
    return this.apollo.mutation(mutation, variables);
  }
  remove(id: string) {
    const variables = { id: id };
    const mutation = gql`
      mutation removeRegister($id: ID!) {
        removeRegister(_id: $id)
      }
    `;
    return this.apollo.mutation(mutation, variables);
  }
  /*load(input: any) {
    const configInput = {
      status: "active",
      companies: input.company,
      //value: { sections: "registerOptions" },
    };
    const activityInput = { company: input.company };
    const employeeInput = { company: input.company };
    const query = gql`
      query(
        $register: registerInput
        $activity: activityInput
        $employee: employeeInput
        $configuration: configurationInput
      ) {
        register(input: $register) {
          ...registerFragment
        }
        configuration(input: $configuration) {
          ...configFragment
        }
        activities(input: $activity) {
          ...activityFragment
        }
        employees(input: $employee) {
          ...employeeFragment
        }
      }
      ${RegisterService.getFragment()}
      ${ConfigurationService.getFragment()}
      ${ActivityService.getFragment()}
      ${EmployeeService.getFragment()}
    `;
    return this.apollo.watchQuery<any>({
      query: query,
      variables: {
        register: input,
        configuration: configInput,
        activity: activityInput,
        employee: employeeInput,
      },
      fetchPolicy: "network-only",
    }).valueChanges;
  }*/
}
