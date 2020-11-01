export interface Configuration {
  _id?: string,
  type?: string;
  id?: string;
  desc?: string;
}
export abstract class ConfigurationData {
  abstract getType(type: string);
  abstract get(type: Object);
}
