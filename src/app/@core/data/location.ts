import { CommonData } from './common';
export interface LatLng {
  lat: number,
  lng:number,
}
export interface Zone {
  name?:string,
  latsLngs: LatLng[],
}
export interface Location {
  _id?: string,
  name: string,
  center?:LatLng,
  zones?:Zone[],
  options?:String[]
}
export abstract class LocationData extends CommonData {}
