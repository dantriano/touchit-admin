import { Deserializable } from "./deserializable.model";
import { Location } from "./location.model";

export class Activity implements Deserializable {
  _id: string;
  name: string;
  options: Object;
  startFrom: string;
  startTo: string;
  duration: string;
  days: number[];
  locations: [];
  _locations: Location[];

  deserialize(input: any) {
    Object.assign(this, input);
    this._locations = this._locations.map((x) => new Location().deserialize(x));
    return this;
  }
}
