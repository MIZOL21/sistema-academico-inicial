import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dasboard-home',
  imports: [CommonModule],
  templateUrl: './dasboard-home.html',
  styleUrl: './dasboard-home.css',
})
export class DasboardHome {
  stats = [
    { title: 'Total Estudiantes', value: '245', icon: 'people_alt', colorClass: 'icon-blue' },
    { title: 'Total Docentes', value: '18', icon: 'school', colorClass: 'icon-green' },
    { title: 'Total Cursos', value: '6', icon: 'menu_book', colorClass: 'icon-purple' },
    { title: 'Total Paralelos', value: '12', icon: 'layers', colorClass: 'icon-orange' }
  ];

  activities = [
    { type: 'Matrícula', text: 'Juan Pérez matriculado en Kinder A', time: 'Hace 2 horas', tagClass: 'tag-blue' },
    { type: 'Asistencia', text: 'Registro de asistencia para Pre-Kinder B', time: 'Hace 3 horas', tagClass: 'tag-green' },
    { type: 'Calificación', text: 'Calificaciones actualizadas para Maternal A', time: 'Hace 5 horas', tagClass: 'tag-purple' },
    { type: 'Tarea', text: 'Nueva tarea asignada a Pre-Básica A', time: 'Hace 8 horas', tagClass: 'tag-orange' }
  ];
}
