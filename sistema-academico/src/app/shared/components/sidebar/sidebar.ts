import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  menuItems = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { label: 'Estudiantes', icon: 'people', route: '/estudiantes' },
    { label: 'Docentes', icon: 'school', route: '/docentes' },
    { label: 'Cursos', icon: 'menu_book', route: '/cursos' },
    { label: 'Paralelos', icon: 'layers', route: '/paralelos' },
    { label: 'Matrículas', icon: 'person_add', route: '/matriculas' },
    { label: 'Asistencia', icon: 'check_circle', route: '/asistencia' },
    { label: 'Calificaciones', icon: 'military_tech', route: '/calificaciones' },
    { label: 'Tareas', icon: 'assignment', route: '/tareas' }
  ];

  constructor(private router: Router) {}

  logout() {
    console.log('Cerrar sesión');
    this.router.navigate(['/login']);
  }
}
