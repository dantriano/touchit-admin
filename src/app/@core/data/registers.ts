import { LatLng, Location } from './location';
import { Users } from './users';
import { Activity } from './activity';
import { Employee } from './employee';

export interface ServiceInfo {
  id:string,
  name?:string,
  type?:string,
}
export interface EmployeeInfo {
  id:string,
  name?:string,
}
export interface LocationInfo {
  id:string,
  location:string,
  zone:string,
  latsLngs: LatLng,
}
export interface Registers {
  id: string,
  date:Date,
  service:ServiceInfo,
  user:EmployeeInfo,
  location:LocationInfo
}
export abstract class RegistersData {
  abstract newRegister(employee?:Employee,service?:Activity,location?:Location);
  abstract getRegisters();
  abstract addRegister(el:Registers);
  abstract getRegister(id:string);
  abstract removeRegister(id:string);
}
