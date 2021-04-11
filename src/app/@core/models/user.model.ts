import { Deserializable } from "./deserializable.model";

export class User implements Deserializable {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
  token: string;
  status: string;
  companies: UserCompany[];
  currentCompany:string;
  //car: Car;

  deserialize(input: any) {
    Object.assign(this, input);
    this.companies = this.companies?.map((x) =>
      new UserCompany().deserialize(x)
    );
    //this.car = new Car().deserialize(input.car);
    return this;
  }
}
class UserCompany implements Deserializable {
  company: string;
  user: string;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
