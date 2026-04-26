import { Routes } from '@angular/router';
import { authRoutes } from './modules/auth/auth.routes';
import { Dashboard } from './modules/dashboard/dashboard';

export const routes: Routes = [
  ...authRoutes,
  { path: 'dashboard', component: Dashboard },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
