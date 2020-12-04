import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription, throwError, of} from 'rxjs';
import { first, map} from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { User, UserData } from 'app/@core/data';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    posts: any[];
    loading = true;
    error: any;
    data: any;
    isAuthenticated: boolean = false;
    querySubscription: Subscription;
    currentUserSubject:BehaviorSubject<User> = new BehaviorSubject<User>(null);
    currentUser:Observable<User> = this.currentUserSubject.asObservable();

    constructor(private userService: UserData) {
        if(localStorage.getItem('currentUser')){
            this.setAuth(JSON.parse(localStorage.getItem('currentUser')))
        }
    }
    getUser(){
        return this.currentUserSubject.getValue();
    }
    setAuth(user: User) {
        this.currentUserSubject.next(user);
        this.isAuthenticated=true
    }
    attemptAuth(credentials){
      return this.userService.login({ email: credentials.username, password: credentials.password })
      .pipe(first())
      .subscribe(
        data => {
          const user = data.data.login
          this.setAuth(user);
          localStorage.setItem('currentUser', JSON.stringify(user));
          return;
        },
        error => {
            this.logout()
            return;
            return throwError('Error');  
        });
    
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.isAuthenticated=false
    }
}