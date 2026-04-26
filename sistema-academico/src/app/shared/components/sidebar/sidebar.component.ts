import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  menuItems = [
    { label: 'Dashboard', icon: 'bi-grid-fill', route: '/dashboard' },
    { label: 'Estudiantes', icon: 'bi-people', route: '#' },
    { label: 'Docentes', icon: 'bi-person-vcard', route: '#' },
    { label: 'Cursos', icon: 'bi-journal-bookmark', route: '#' },
    { label: 'Paralelos', icon: 'bi-columns-gap', route: '#' },
    { label: 'Matrículas', icon: 'bi-person-add', route: '#' },
    { label: 'Asistencia', icon: 'bi-check2-square', route: '#' },
    { label: 'Calificaciones', icon: 'bi-clipboard-check', route: '#' },
    { label: 'Tareas', icon: 'bi-book', route: '#' },
    { label: 'Reportes', icon: 'bi-file-earmark-bar-graph', route: '#' },
    { label: 'Usuarios', icon: 'bi-person-gear', route: '#' },
    { label: 'Configuración', icon: 'bi-gear', route: '#' }
  ];
}
