import { Deserializable } from "./deserializable.model";

export class Location implements Deserializable {
  _id: string;
  name: string;
  center: Object;
  zones:Object;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
