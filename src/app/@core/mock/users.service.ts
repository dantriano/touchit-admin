import { of as observableOf, Observable,throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from 'app/@core/data/user';

@Injectable()
export class UserService  {
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
  setAuth(user: User) {
    this.currentUser=user;
    this.isAuthenticated=true;
  }
  attemptAuth(credentials):Observable<User>{
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
