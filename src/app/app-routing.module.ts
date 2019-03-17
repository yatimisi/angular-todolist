import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';

import { NonFoundComponent } from './pages/non-found/non-found.component';

const routes: Routes = [
  {
    path: 'not-found',
    component: NonFoundComponent
  },

  { path: '', pathMatch: 'full', redirectTo: 'not-found' },
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
  NonFoundComponent
];
