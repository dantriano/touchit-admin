import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { first, map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class ApolloService extends Apollo {
  watch(query, variables): Observable<any> {
    return this.watchQuery<any>({
      query: query,
      variables: variables,
      fetchPolicy: "network-only",
    })
      .valueChanges.pipe(first())
      .pipe(map((query) => query.data));
  }
  mutation(mutation, variables): Observable<any> {
    return this.mutate<any>({
      mutation: mutation,
      variables: variables,
    })
      .pipe(first())
      .pipe(map((query) => query));
  }
}
