import {Component, OnInit} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'exchange-rates',
  template: `
    <div *ngIf="loading">
      Loading...
    </div>
    <div *ngIf="error">
      Error :(
    </div>
    <div *ngIf="posts">
      <div *ngFor="let post of posts">
        <p>{{post.title}}: {{post.content}}</p>
      </div>
    </div>
  `,
})
export class TestComponent implements OnInit {
  posts: any[];
  loading = true;
  error: any;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: gql`
        {
            user(id: "5e495ff63ecd80374e205d23") {
                        name
                      }
                    }
        `,
      })
      .valueChanges.subscribe(result => {
          console.log(result.data);
        //this.posts = result.data && result.data.posts;
        this.loading = result.loading;
        this.error = result.errors;
      });
  }
}