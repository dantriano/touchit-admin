import { Injectable } from '@angular/core';
import { Registers, RegistersData, LocationInfo, EmployeeInfo, ServiceInfo} from '../data/registers';
import { Location } from '../data/location';
import { Activity } from '../data/activity';
import { Users } from '../data/users';
import { Employee } from '../data/employee';

@Injectable()
export class RegistersService extends RegistersData {
  private registers: Registers[] = [
    {
      id: '1',
      date: new Date(),
      service: {'id':'1','name':'Entrada','type':'checkin'},
      user: {'id':'1','name':'Dan Triano'},
      location:{'id':'1','location':'Barcelona','zone':'Zona 1','latsLngs':{ 'lat': 41.39003227650248, 'lng':2.1553320072104043 }}
    }
  ];
  newRegister(employee?:Employee,service?:Activity,location?:Location){
    let employeeData:EmployeeInfo;
    let serviceData:ServiceInfo;
    let locationData:LocationInfo;
    return{
      id: (this.registers.length + 1).toString(),
      date: new Date(),
      service:serviceData,
      user: employeeData,
      location:locationData
    }
  }
  addRegister(el: Registers) {
    var index = this.registers.indexOf(el);
    if (index !== -1) {
      this.registers[index] = el;
    } else {
      this.registers.push(el);
    }
  }
  getRegisters() {
    return this.registers;
  }

  getRegister(id: string) {
    return this.registers.find(element => element.id == id);
  }
  removeRegister(id:string){
    this.registers = this.registers.filter(item => item.id != id);
  }
}
