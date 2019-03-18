import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';

import { ListComponent } from './pages/list/list.component';
import { NonFoundComponent } from './pages/non-found/non-found.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TodoComponent } from './components/todo/todo.component';


const routes: Routes = [
  {
    path: 'list',
    component: ListComponent
  },
  {
    path: 'not-found',
    component: NonFoundComponent
  },

  { path: '', pathMatch: 'full', redirectTo: 'list' },
  { path: '**', redirectTo: 'not-found'}
];

const config: ExtraOptions = {
  useHash: true
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  ListComponent,
  NonFoundComponent,
  NavbarComponent,
  TodoComponent
];
