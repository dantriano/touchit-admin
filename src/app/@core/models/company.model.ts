import { Deserializable } from "./deserializable.model";
import { Location } from "./location.model";

export class Company implements Deserializable {
  _id: string;
  name: string;
  locations: Location[];

  deserialize(input: any) {
    Object.assign(this, input);
    this.locations = this.locations?.map((x) => new Location().deserialize(x)) || [];
    return this;
  }
}
