import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { RecuperarPassword } from './pages/recuperar-password/recuperar-password';

export const authRoutes: Routes = [

  {
    path: 'login',
    component: Login
  },

  {
    path: 'recuperar-password',
    component: RecuperarPassword
  }

];
