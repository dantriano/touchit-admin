import { Deserializable } from "./deserializable.model";

export class Configuration implements Deserializable {
  _id: string;
  type: string;
  name: string;
  desc: string;
  status: string;
  companies: string[];
  value: Object;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
