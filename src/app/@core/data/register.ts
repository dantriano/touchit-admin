import { CommonData } from './common';

export interface Register {
  _id?: string,
  name?: string,
  mainService?: string,
  activities?: any[],
  activitiesAvailable?:any[],
  events?: string[]
}
export abstract class RegisterData extends CommonData {}