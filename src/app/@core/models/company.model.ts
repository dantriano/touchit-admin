import { Deserializable } from "./deserializable.model";

export class Company implements Deserializable {
  _id: string;
  name: string;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
