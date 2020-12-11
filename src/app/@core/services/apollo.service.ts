import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { map } from 'rxjs/operators';

@Injectable({ providedIn: "root" })
export class ApolloService extends Apollo {

  public watch(query, variables) {
    return this.watchQuery<any>({
      query: query,
      variables: variables,
      fetchPolicy: "network-only",
    }).valueChanges.pipe(map(query => query.data));
  }
  public mutation(mutation,variables){
    return this.mutate<any>({
      mutation: mutation,
      variables: variables,
    }).pipe(map(query => query));
  }
}
