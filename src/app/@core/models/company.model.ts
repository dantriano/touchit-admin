import { Deserializable } from "./deserializable.model";
import { Location } from "./location.model";

export class Company implements Deserializable {
  _id: string;
  name: string;
  locations: Location[];

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
