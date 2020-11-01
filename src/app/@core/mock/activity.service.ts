import { Injectable } from '@angular/core';
import { Activity, ActivityData } from '../data/activity';

@Injectable()
export class ActivityService{// extends ActivityData {

  private ops: any[] = [
    {
      id: 'isInTime',
      desc: 'Is in included in the worker time'
    }, {
      id: 'isInWork',
      desc: 'This Activity can be selected during the work time'
    }, {
      id: 'isOutWork',
      desc: 'This Activity can be selected out of the work time'
    }];
  private Activities: Activity[] = [
    {
      _id: '1',
      name: 'Comer',
      options: [],
      locations:['1'],
    },
    {
      _id: '2',
      name: 'Medico',
      options: [],
      locations:[],
    },
    {
      _id: '3',
      name: 'Medico',
      options: [],
      locations:[],
    },
    {
      _id: '4',
      name: 'Medico',
      options: [],
      locations:[],
    },
    {
      _id: '5',
      name: 'Medico',
      options: [],
      locations:[],
    },
    {
      _id: '6',
      name: 'Medico',
      options: [],
      locations:[],
    }
  ];

  newActivity() {
    let Activity: Activity = {
      _id: (this.Activities.length + 1).toString(),
      name: '',
      options: [],
      locations:[],
    }
    return Activity;
  }
  getActivities() {
    return this.Activities;
  }

  getActivity(id: string) {
    return this.Activities.find(element => element._id == id);
  }
  getOptions() {
    return this.ops;
  }
  addActivity(el: Activity) {
    var index = this.Activities.indexOf(el);
    if (index !== -1) {
      this.Activities[index] = el;
    } else {
      this.Activities.push(el);
    }
  }
  removeActivity(id: string) {
    this.Activities = this.Activities.filter(item => item._id != id);
  }
}
