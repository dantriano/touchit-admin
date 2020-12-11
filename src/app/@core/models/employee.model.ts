import { Deserializable } from "./deserializable.model";

export class Employee implements Deserializable {
  _id: string;
  avatar: string;
  firstName: string;
  lastName:string;
  status:string;
  _groups: Object;
  //_groups: Group;

  deserialize(input: any) {
    if(!input) return null
    Object.assign(this, input);
    //this._groups = this._groups.map(x=> return new Group().deserialize(x));
    return this;
  }
}
