import { CommonData } from './common';
import { BehaviorSubject } from 'rxjs';
export interface User {
  _id?: string,
  firstName?: string,
  email?: string,
}
export abstract class UserData extends CommonData {
  currentSubject:BehaviorSubject<User>;
  currentUserValue:User;
  abstract login(input:any);
  abstract logout();
  abstract token(input:any);
}
