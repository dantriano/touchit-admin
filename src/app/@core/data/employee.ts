import { CommonData } from './common';

export interface Employee {
  _id?: string;
  employeeCode: string;
  firstName: string;
  lastName: string;
  email: string;
  isLinked: boolean;
  linkCode: string;
  avatar: string;
  groups: any[];
  status:string;
  mainActivity:any[];
  customActivities:any[];
  allGroups?:any[];
  allActivities?:any[];
  customActivitis?:any[];
}

export abstract class EmployeeData extends CommonData {
  abstract generateCode();
}