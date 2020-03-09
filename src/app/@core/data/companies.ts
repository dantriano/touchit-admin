import { Employee } from './employee';
import { Location } from './location';
import { Activity } from './activity';
import { Group } from './group';

export interface Companies {
  id:string,
  name: string;
  picture?: string;
  employees?:Employee[];
  locations?:Location[];
  services?:Activity[];
  groups?:Group[];
  status?:string;
}

export abstract class CompaniesData {
  abstract getCompany(id: string);
  abstract getCompanies(list:string[]);
  abstract getAllCompanies();
  abstract newCompany();
}
