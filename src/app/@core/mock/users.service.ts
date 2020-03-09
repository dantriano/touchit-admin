import { of as observableOf, Observable,throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { UsersData, Users } from '../data/users';

@Injectable()
export class UsersService extends UsersData {
  private time: Date = new Date;
  public currentUser;
  public isAuthenticated=false;
  private users = [
    { 'id': '1', 'name': 'Nick Jones', 'email': 'dan@dan.es', 'password': '1234', 'picture': 'assets/images/nick.png' }
  ];
  getUser(id: string) {
    return this.users.find(element => element.id == id);
  }
  getUsers(): Observable<any> {
    return observableOf(this.users);
  }
  setAuth(user: Users) {
    this.currentUser=user;
    this.isAuthenticated=true;
  }
  attemptAuth(credentials):Observable<Users>{
   const user= this.users.filter(function(user) {
      return (user.email == credentials.email && user.password == credentials.password);
    });
    user.map(
      data => {
        this.setAuth(data);
        return this.currentUser;
      }
    );
    if (this.isAuthenticated) {
      return observableOf(this.currentUser); 
    } else{
      return throwError('Error');  
    }
    
  }
}
