import { CommonData } from './common';
export interface Group {
  _id?: string,
  name?: string,
  mainService?: string,
  activities?: any[],
  activitiesAvailable?:any[],
  events?: string[]
}
export abstract class GroupData extends CommonData {}
