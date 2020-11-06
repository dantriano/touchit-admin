import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { setContext } from 'apollo-link-context';

const uri = 'http://localhost:5000/api';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});
const currentUser=localStorage.getItem('currentUser');
const user = (currentUser && currentUser!='undefined')?JSON.parse(currentUser):'';
const auth = setContext((operation, context) => ({
  headers: {
    Authorization: (user)?user.token:'',
    //CurrentCompany:'5e6acf4e2a94ac32a586eafa'
  },
}));

export function createApollo(httpLink: HttpLink) {
  return {
    link: ApolloLink.from([auth, httpLink.create({ uri })]),
    cache: new InMemoryCache({ addTypename: false}),
  };
}
@NgModule({
  exports: [HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule { }
