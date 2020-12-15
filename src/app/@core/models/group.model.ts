import { Deserializable } from "./deserializable.model";
import { Activity } from "./activity.model";

export class Group implements Deserializable {
  _id: string;
  name: string;
  main: string;
  activities: string[];
  options: string[];
  _activities: Activity[];

  deserialize(input: any) {
    Object.assign(this, input);
    this._activities = this._activities?.map((x) =>
      new Activity().deserialize(x)
    );
    return this;
  }
}
