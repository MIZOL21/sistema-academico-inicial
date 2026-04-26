import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <div class="dashboard-container p-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 class="mb-0">Panel Académico</h1>
          <p class="text-muted">Bienvenido, {{ authService.currentUser() }}</p>
        </div>
        <button mat-flat-button color="warn" (click)="logout()">Cerrar Sesión</button>
      </div>

      <div class="row g-4">
        @for (module of modules; track module.name) {
          <div class="col-md-3">
            <mat-card class="h-100 shadow-sm border-top-custom">
              <mat-card-header>
                <mat-icon mat-card-avatar color="primary">{{ module.icon }}</mat-icon>
                <mat-card-title>{{ module.name }}</mat-card-title>
              </mat-card-header>
              <mat-card-content class="pt-3">
                <p>{{ module.description }}</p>
              </mat-card-content>
              <mat-card-actions align="end">
                <button mat-button color="primary">ABRIR</button>
              </mat-card-actions>
            </mat-card>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container { max-width: 1200px; margin: 40px auto; }
    .border-top-custom { border-top: 4px solid #3f51b5; border-radius: 8px; }
    h1 { color: #3f51b5; font-weight: bold; }
  `]
})
export class Dashboard {
  authService = inject(AuthService);
  private router = inject(Router);

  modules = [
    { name: 'Estudiantes', icon: 'groups', description: 'Gestión de niños y niñas.' },
    { name: 'Docentes', icon: 'person', description: 'Personal educativo.' },
    { name: 'Aulas', icon: 'meeting_room', description: 'Gestión de espacios.' },
    { name: 'Asistencia', icon: 'fact_check', description: 'Control diario.' }
  ];

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
