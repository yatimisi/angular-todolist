import { Component } from '@angular/core';

const template = `
<div class="container my-3">
  <router-outlet></router-outlet>
</div>
`;

@Component({
  selector: 'app-root',
  template
})
export class AppComponent {
  title = 'angular-todolist';
}
