import { Component, OnInit } from '@angular/core';
import { RegisterData } from '../../@core/data'

@Component({
  selector: 'ngx-timeline',
  styleUrls: ['./timeline.component.scss'],
  templateUrl: './timeline.component.html'
})
export class TimelineComponent implements OnInit {
  timeline = {
    'services': [
      {
        'name': 'Main Service', 'text': 'Description', 'timelapse': [
          {
            'time': '10:00 PM',
            'type': [{
              'name': 'in', 'users': [
                { 'id':'1','name':'Elisabeth','avatar': 'assets/images/eva.png', 'time': '10:05' },
                { 'id':'1','name':'Elisabeth','avatar': 'assets/images/eva.png', 'time': '10:05' },
                { 'id':'1','name':'Elisabeth','avatar': 'assets/images/eva.png', 'time': '10:05' },
                { 'id':'1','name':'Elisabeth','avatar': 'assets/images/eva.png', 'time': '10:05' },
                { 'id':'1','name':'Elisabeth','avatar': 'assets/images/eva.png', 'time': '10:05' },
                { 'id':'1','name':'Elisabeth','avatar': 'assets/images/eva.png', 'time': '10:05' },
                { 'id':'1','name':'Elisabeth','avatar': 'assets/images/eva.png', 'time': '10:05' },
              ]
            },
            {
              'name': 'out', 'users': [
                { 'id':'1','name':'Elisabeth','avatar': 'assets/images/eva.png', 'time': '10:05' },
                { 'id':'1','name':'Elisabeth','avatar': 'assets/images/eva.png', 'time': '10:05' },
                { 'id':'1','name':'Elisabeth','avatar': 'assets/images/eva.png', 'time': '10:05' },
                { 'id':'1','name':'Elisabeth','avatar': 'assets/images/eva.png', 'time': '10:05' },
                { 'id':'1','name':'Elisabeth','avatar': 'assets/images/eva.png', 'time': '10:05' },
                { 'id':'1','name':'Elisabeth','avatar': 'assets/images/eva.png', 'time': '10:05' },
                { 'id':'1','name':'Elisabeth','avatar': 'assets/images/eva.png', 'time': '10:05' },
                { 'id':'1','name':'Elisabeth','avatar': 'assets/images/eva.png', 'time': '10:05' },
              ]
            }]
          },
        ]
      }, {
        'name': 'Comida', 'text': 'Description', 'timelapse': [
          {
            'time': '10:00 PM',
            'type': [{
              'name': 'in', 'users': [
                { 'id':'1','name':'Elisabeth','avatar': 'assets/images/eva.png', 'time': '10:05' },
                { 'id':'1','name':'Elisabeth','avatar': 'assets/images/eva.png', 'time': '10:05' },
                { 'id':'1','name':'Elisabeth','avatar': 'assets/images/eva.png', 'time': '10:05' },
                { 'id':'1','name':'Elisabeth','avatar': 'assets/images/eva.png', 'time': '10:05' },
                { 'id':'1','name':'Elisabeth','avatar': 'assets/images/eva.png', 'time': '10:05' },
                { 'id':'1','name':'Elisabeth','avatar': 'assets/images/eva.png', 'time': '10:05' },
                { 'id':'1','name':'Elisabeth','avatar': 'assets/images/eva.png', 'time': '10:05' },
              ]
            },
            {
              'name': 'out', 'users': [
                { 'id':'1','name':'Elisabeth','avatar': 'assets/images/eva.png', 'time': '10:05' },
                { 'id':'1','name':'Elisabeth','avatar': 'assets/images/eva.png', 'time': '10:05' },
                { 'id':'1','name':'Elisabeth','avatar': 'assets/images/eva.png', 'time': '10:05' },
                { 'id':'1','name':'Elisabeth','avatar': 'assets/images/eva.png', 'time': '10:05' },
              ]
            }]
          },
          {
            'time': '12:00 PM',
            'type': [{
              'name': 'in', 'users': [
                { 'id':'1','name':'Elisabeth','avatar': 'assets/images/eva.png', 'time': '10:05' },
                { 'id':'1','name':'Elisabeth','avatar': 'assets/images/eva.png', 'time': '10:05' },
              ]
            }]},
        ]
      },
      ]
  };
  registers: any;
  constructor(private service: RegisterData) {
    this.registers = service.getList();
    console.log(this.timeline);
  }

  ngOnInit() {
  }

}
