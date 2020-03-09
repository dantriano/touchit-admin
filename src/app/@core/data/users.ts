import { Observable } from 'rxjs';
export interface Asociations{
  employee?:string;
  company:string;
  date:Date;
  status:string;
}
export interface Users {
  id:string;
  name: string;
  email:string;
  password:string;
  picture: string;
  asociations?:Asociations[];
}
export abstract class UsersData {
  abstract currentUser;
  abstract isAuthenticated;
  abstract getUser(id: string);
  abstract getUsers(): Observable<Users[]>;
  abstract attemptAuth(credentials):Observable<Users>;
  abstract setAuth(user: Users);
}
