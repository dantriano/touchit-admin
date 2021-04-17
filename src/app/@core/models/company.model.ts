import { Activity } from "./activity.model";
import { Deserializable } from "./deserializable.model";
import { Employee } from "./employee.model";
import { Group } from "./group.model";
import { Location } from "./location.model";
import { Schedule } from "./schedule.model";

export class Company implements Deserializable {
  _id: string;
  name: string;
  locations: Location[];
  groups: Group[];
  activities: Activity[];
  schedules: Schedule[];
  employees: Employee[];

  deserialize(input: any) {
    Object.assign(this, input);
    this.locations =
      this.locations?.map((x) => new Location().deserialize(x)) || [];
    this.groups = this.groups?.map((x) => new Group().deserialize(x)) || [];
    this.schedules =
      this.schedules?.map((x) => new Schedule().deserialize(x)) || [];
    this.activities =
      this.activities?.map((x) => new Activity().deserialize(x)) || [];
    this.employees =
      this.employees?.map((x) => new Employee().deserialize(x)) || [];
    return this;
  }
}
