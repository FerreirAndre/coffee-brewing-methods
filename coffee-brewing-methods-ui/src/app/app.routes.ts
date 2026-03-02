import { Routes } from '@angular/router';
import { CoffeeMethodList } from './components/coffee-method-list/coffee-method-list';

export const routes: Routes = [
  {
    path: 'coffee-methods',
    component: CoffeeMethodList
  },
  {
    path: '',
    redirectTo: 'coffee-methods',
    pathMatch: 'full'
  }
];
