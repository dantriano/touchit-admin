import { Deserializable } from "./deserializable.model";

export class User implements Deserializable {
  _id: string;
  email: string;
  firstName:string;
  _company: string[];
  //car: Car;
  
  deserialize(input: any) {
    Object.assign(this, input);
    //this.car = new Car().deserialize(input.car);
    return this;
  }
}
