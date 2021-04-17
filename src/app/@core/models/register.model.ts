import { Deserializable } from "./deserializable.model";

export class Register implements Deserializable {
  _id: string;
  company: string;
  activity: Object;
  employee: string;
  start: string;
  end: string;
  inPosition: string;
  delay: string;
  location: Object;
  _employee:Object;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
