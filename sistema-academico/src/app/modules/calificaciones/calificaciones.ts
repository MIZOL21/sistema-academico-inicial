import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { AttendanceService, GradeRecord } from '../../core/services/attendance.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-calificaciones',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './calificaciones.html',
  styleUrls: ['./calificaciones.css']
})
export class Calificaciones implements OnInit {
  displayedColumns: string[] = ['estudiante', 'materia', 'parcial1', 'parcial2', 'examen', 'promedio', 'cualitativa'];
  dataSource: GradeRecord[] = [];

  constructor(
    private attendanceService: AttendanceService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.attendanceService.getGrades().subscribe(data => {
      this.dataSource = data;
    });
  }

  onGradeChange(row: GradeRecord): void {
    this.attendanceService.updateGrade(row);
  }

  getGradeClass(grade: number): string {
    if (grade >= 9) return 'excelente';
    if (grade >= 7) return 'aprobado';
    return 'reprobado';
  }

  getQualitativeLabel(grade: number): string {
    if (grade >= 9) return 'A (Adquirida)';
    if (grade >= 7) return 'EP (En Proceso)';
    return 'I (Iniciada)';
  }
}
