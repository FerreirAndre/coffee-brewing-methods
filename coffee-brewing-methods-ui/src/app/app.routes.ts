import { Routes } from '@angular/router';
import { CoffeeMethodList } from './components/coffee-method-list/coffee-method-list';
import { CoffeeMethodDetails } from './components/coffee-method-details/coffee-method-details';
import { CoffeeMethodForm } from './components/coffee-method-form/coffee-method-form';

export const routes: Routes = [
  {
    path: 'coffee-methods',
    component: CoffeeMethodList,
  },
  {
    path: '',
    redirectTo: 'coffee-methods',
    pathMatch: 'full',
  },
  {
    path: 'coffee-methods/create',
    component: CoffeeMethodForm,
  },
  {
    path: 'coffee-methods/edit/:id',
    component: CoffeeMethodForm
  },
  {
    path: 'coffee-methods/:id',
    component: CoffeeMethodDetails
  },
];
