import { Injectable } from '@angular/core';
import { Group,GroupData } from '../data/group';

@Injectable()
export class GroupService implements GroupData {
  
  private groups: Group[] = [
    {
      _id: '1',
      name: 'Administrativos',
      mainService:'1',
      events:['2']
    }, 
    {
      _id: '2',
      name: 'Tecnicos',
      mainService:'1',
      events:[]
    }, 
    {
      _id: '2',
      name: 'Tecnicos',
      mainService:'1',
      events:[]
    }, 
    {
      _id: '2',
      name: 'Tecnicos',
      mainService:'1',
      events:[]
    }, 
    {
      _id: '2',
      name: 'Tecnicos',
      mainService:'1',
      events:[]
    }, 
    {
      _id: '2',
      name: 'Tecnicos',
      mainService:'1',
      events:[]
    }, 
    {
      _id: '2',
      name: 'Tecnicos',
      mainService:'1',
      events:[]
    }
  ];
  save(){}
  create() {
    let group: Group =  {
      name: '',
      mainService:'',
      events:[]
    }
    return group;
  }
  getList() {
    return this.groups;
  }

  getOne(id:string) {
   return this.groups.find(element => element._id == id);
  }
  add(el: Group) {
    var index = this.groups.indexOf(el);
    if (index !== -1) {
      this.groups[index] = el;
    } else {
      this.groups.push(el);
    }
  }
  update(){}
  load(){}
  remove(id:string){
    this.groups = this.groups.filter(item => item._id != id);
  }
}
