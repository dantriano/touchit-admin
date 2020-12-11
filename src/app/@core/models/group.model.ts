import { Deserializable } from "./deserializable.model";

export class Group implements Deserializable {
  _id: string;
  name: string;
  main: string;
  activities: string[];
  options: string[];

  deserialize(input: any) {
    Object.assign(this, input);
    //this._groups = this._groups.map(x=> return new Group().deserialize(x));
    return this;
  }
}
