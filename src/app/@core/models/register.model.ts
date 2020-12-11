import { Deserializable } from "./deserializable.model";

export class Register implements Deserializable {
  _id: string;
  activity: string;
  employee: string;
  start: string;
  end: string;
  inPosition: string;
  delay: string;
  location: Object;
  _employee:Object;
  _activity:Object;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
