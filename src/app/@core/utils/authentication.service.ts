import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Users } from 'app/@core/data/users';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<Users>;
    public currentUser: Observable<Users>;
    posts: any[];
    loading = true;
    error: any;
    data: any;
    constructor(private http: HttpClient, private apollo: Apollo) {
        this.currentUserSubject = new BehaviorSubject<Users>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): Users {
        return this.currentUserSubject.value;
    }
   /* login(email: string, password: string) {
        const query = gql`
            query login($email: String!,$password: String!) {
                login(email: $email ,password: $password) {
                    _id
                    firstName
    				lastName
    				picture
                    token
                    email
                    bind
                }
            }
            `;
        return this.apollo
            .watchQuery<any>({
                query: query,
                variables: {
                    email: email,
                    password: password,
                }
            })
            .valueChanges.pipe(map(({ data }) => {
                localStorage.setItem('currentUser', JSON.stringify(data.login));
                this.currentUserSubject.next(data.login);
            }));
    }*/

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}