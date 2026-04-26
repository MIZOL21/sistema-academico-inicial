import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';

// Angular Material Imports
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatDividerModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  authService = inject(AuthService);

  modules = [
    { name: 'Estudiantes', icon: 'groups', description: 'Gestión de datos de niños y niñas.', color: 'primary' },
    { name: 'Docentes', icon: 'person_4', description: 'Administración de personal educativo.', color: 'accent' },
    { name: 'Registro de Aulas', icon: 'domain', description: 'Control de salones y recursos.', color: 'warn' },
    { name: 'Asistencia y Evaluaciones', icon: 'assessment', description: 'Reportes de progreso y puntualidad.', color: 'primary' }
  ];
}
