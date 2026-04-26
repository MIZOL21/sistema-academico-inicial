import { Routes } from '@angular/router';
import { authRoutes } from './modules/auth/auth.routes';
import { Layout } from './shared/components/layout/layout';
import { DasboardHome } from './modules/dashboard/dasboard-home/dasboard-home';

export const routes: Routes = [
  ...authRoutes,
  {
    path: '',
    component: Layout,
    children: [
      { path: 'dashboard', component: DasboardHome },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'login' }
];
