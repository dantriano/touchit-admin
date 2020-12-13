import { Deserializable } from "./deserializable.model";
import { Group } from "./group.model";

export class Employee implements Deserializable {
  _id: string;
  avatar: string;
  firstName: string;
  lastName:string;
  status:string;
  _groups: Group[];

  deserialize(input: any) {
    if(!input) return null
    Object.assign(this, input);
    this._groups = this._groups.map(x=> new Group().deserialize(x));
    return this;
  }
}
