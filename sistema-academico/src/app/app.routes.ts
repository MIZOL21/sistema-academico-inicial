import { Routes } from '@angular/router';
import { authRoutes } from './modules/auth/auth.routes';
import { Layout } from './shared/components/layout/layout';
import { DasboardHome } from './modules/dashboard/dasboard-home/dasboard-home';
import { UnderConstruction } from './shared/components/under-construction/under-construction';
import { Estudiantes } from './modules/estudiantes/estudiantes';
import { Asistencia } from './modules/asistencia/asistencia';
import { Calificaciones } from './modules/calificaciones/calificaciones';

export const routes: Routes = [
  ...authRoutes,
  {
    path: '',
    component: Layout,
    children: [
      { path: 'dashboard', component: DasboardHome },
      { path: 'estudiantes', component: Estudiantes },
      { path: 'docentes', component: UnderConstruction },
      { path: 'cursos', component: UnderConstruction },
      { path: 'paralelos', component: UnderConstruction },
      { path: 'matriculas', component: UnderConstruction },
      { path: 'asistencia', component: Asistencia },
      { path: 'calificaciones', component: Calificaciones },
      { path: 'tareas', component: UnderConstruction },
      { path: 'perfil', component: UnderConstruction },
      { path: 'configuracion', component: UnderConstruction },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'login' }
];
