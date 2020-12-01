import { Component } from '@angular/core';

@Component({
    selector: 'app-test',
    templateUrl: 'test.component.html'
})
export class TestComponent {
  posts: any[];
  loading = true;
  error: any;

  ngOnInit() {
  }
}