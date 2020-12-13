import { ApolloService } from "./apollo.service";
import gql from "graphql-tag";
import { Observable, BehaviorSubject, of } from "rxjs";

export class Service {
  constructor(protected apollo: ApolloService) {}
  protected subject = new BehaviorSubject<any>(null);
  protected subjectList = new BehaviorSubject<any[]>([]);
  public fragment;
  protected saveQuery;
  protected removeQuery;
  protected oneQuery;
  protected listQuery;
  protected toModel;

  get getOneObs(): Observable<any> {
    return this.subject.asObservable();
  }
  get getListObs(): Observable<any[]> {
    return this.subjectList.asObservable();
  }
  get getOne(): any {
    return this.toModel(this.subject.getValue());
  }
  get getList(): any[] {
    return this.subjectList.getValue().map((x) => this.toModel(x));
  }

  loadOne(input: any): Observable<any> {
    const variables = { input: input };
    const query = gql`
      ${this.oneQuery}
      ${this.fragment}
    `;
    const watch = this.apollo.watch(query, variables);
    watch.subscribe((data) => {
      const result: any = Object.values(data)[0];
      this.subject.next(this.toModel(result));
    });
    return watch;
  }

  loadList(input: any): Observable<any> {
    const variables = { input: input };
    const query = gql`
      ${this.listQuery}
      ${this.fragment}
    `;
    const watch = this.apollo.watch(query, variables);
    watch.subscribe((data) => {
      const list: any = Object.values(data)[0];
      console.log(list)
      this.subjectList.next(list.map((x) => this.toModel(x)));
    });
    return watch;
  }

  save(input: any): Observable<any> {
    const variables = { input: input };
    const mutation = gql`
      ${this.saveQuery}
    `;
    const watch = this.apollo.mutation(mutation, variables).subscribe();
    return of(watch);
  }
  remove(input: any): Observable<any> {
    const variables = { input: input };
    const mutation = gql`
      ${this.removeQuery}
    `;
    const watch = this.apollo.mutation(mutation, variables).subscribe();
    return of(watch);
  }
}
