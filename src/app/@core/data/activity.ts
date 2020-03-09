import { CommonData } from './common';

export interface Activity {
  _id?: string,
  name: string,
  locations?:string[],
  locationsAvailable?:string[],
  options?:any[]
}
export abstract class ActivityData extends CommonData {}
