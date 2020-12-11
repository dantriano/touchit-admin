import { Injectable } from "@angular/core";
import { ApolloService } from "./apollo.service";
import gql from "graphql-tag";
import { Observable, BehaviorSubject, of } from "rxjs";
import { Employee } from "../models/employee.model";
import { ActivityService } from "./activity.service";
import { ConfigurationService } from "./configuration.service";
import { GroupService } from "./group.service";

@Injectable({ providedIn: "root" })
export class EmployeeService {
  constructor(private apollo: ApolloService) {}

  private subject = new BehaviorSubject<Employee>(null);
  private subjectList = new BehaviorSubject<Employee[]>([]);
  get employee(): Observable<Employee> {
    return this.subject.asObservable();
  }
  get employees(): Observable<Employee[]> {
    return this.subjectList.asObservable();
  }
  set(user: Employee) {
    this.subject.next(user);
  }
  setAll(user: Employee[]) {
    this.subjectList.next(user);
  }
  /*get(): Employee {
    return this.subject.getValue();
  }
  getAll(): Employee[] {
    return this.subjectList.getValue();
  }*/
  public getFragment=gql`
      fragment employeeFragment on Employee {
        __typename
        _id
        email
        firstName
        lastName
        groups
        _groups {
          name
          activities
        }
        options
        mainActivity
        customActivities {
          _id
          status
        }
        linkCode
        isLinked
      }
    `;
  
  generateCode() {
    var length = 4;
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  getOne(input: any): Observable<any> {
    const variables = { input: input };
    const query = gql`
      query employee($input: employeeInput) {
        employee(input: $input) {
          ...employeeFragment
        }
      }
      ${this.getFragment}
    `;
    const watch = this.apollo.watch(query, variables).subscribe((data) => {
      this.set(new Employee().deserialize(data.employee));
    });

    return of(watch);
  }
  getList(input: any): Observable<any> {
    const variables = { input: input };
    const query = gql`
      query employees($input: employeeInput) {
        employees(input: $input) {
          ...employeeFragment
        }
      }
      ${this.getFragment}
    `;
    const watch = this.apollo.watch(query, variables).subscribe((data) => {
      const result = data.employees.map((x) => new Employee().deserialize(x));
      this.setAll(result);
    });
    return of(watch);
  }
  /*load(input: any): Observable<any> {
    const groupInput = { company: input.company };
    const activityInput = { company: input.company };
    const configInput = {
      status: "active",
      companies: input.company,
      //value: { sections: "employeeOptions" },
    };
    const variables = {
      input: input,
      /*activity: activityInput,
      group: groupInput,
      configuration: configInput,*/
  /* };
    const query = gql`
      query($input: employeeInput) {
        employee(input: $input) {
          ...employeeFragment
        }
      }
      ${EmployeeService.getFragment()}
    `;
    /*
        $configuration: configurationInput!
        $activity: activityInput
        $group: groupInput


        activities(input: $activity) {
          ...activityFragment
        }
        groups(input: $group) {
          ...groupFragment
        }
        configuration(input: $configuration) {
          ...configFragment
        }
      ${ActivityService.getFragment()}
      ${GroupService.getFragment()}
      ${ConfigurationService.getFragment()} */
  // const watch = this.apollo.watch(query, variables).subscribe((data) => {
  /*const activities = data.activities.map((x) =>
        new Activity().deserialize(x)
      );
      const groups = data.activities.map((x) => new Group().deserialize(x));*/
  /*  const employee = new Employee().deserialize(data.employee);
      this.set(employee);
    });
    return of(watch);
  }*/
  save(input: any) {
    const variables = { input: input };
    const mutation = gql`
      mutation saveEmplyee($input: employeeInput!) {
        saveEmployee(input: $input)
      }
    `;
    return this.apollo.mutation(mutation, variables);
  }
  remove(id: string) {
    const variables = { id: id };
    const mutation = gql`
      mutation removeEmployee($id: ID!) {
        removeEmployee(_id: $id)
      }
    `;
    return this.apollo.mutation(mutation, variables);
  }
}
