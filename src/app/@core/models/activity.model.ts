import { Deserializable } from "./deserializable.model";

export class Activity implements Deserializable {
  _id: string;
  name: string;
  options: Object;
  startFrom:string;
  startTo:string;
  duration: string;
  days: number[];
  locations: [];
  _locations: [];

  deserialize(input: any) {
    Object.assign(this, input);
    //this._groups = this._groups.map(x=> return new Group().deserialize(x));
    return this;
  }
}
