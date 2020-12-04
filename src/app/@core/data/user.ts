import { CommonData } from './common';
import { BehaviorSubject,Observable } from 'rxjs';
export interface User {
  _id?: string,
  firstName?: string,
  email?: string,
}
export abstract class UserData extends CommonData {
  abstract login(input:any);
  abstract token(input:any);
}
