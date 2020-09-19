import { Apollo } from 'apollo-angular';

export abstract class CommonData {
  abstract getList(input?: Object);
  abstract getOne(input?: any);
  abstract remove(id: string);
  abstract save(input: Object);
}
