import { Component } from '@angular/core';

const template = `
<app-navbar></app-navbar>
<div class="container my-3">
  <router-outlet></router-outlet>
</div>
`;

@Component({
  selector: 'app-root',
  template
})
export class AppComponent {
  title = 'Todo-list';
}
