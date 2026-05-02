import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { AttendanceService, GradeRecord } from '../../core/services/attendance.service';
import { AuthService } from '../../core/services/auth.service';
import { GradeDialog } from './grade-dialog';

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
    MatDialogModule,
    FormsModule
  ],
  templateUrl: './calificaciones.html',
  styleUrls: ['./calificaciones.css']
})
export class Calificaciones implements OnInit {
  displayedColumns: string[] = ['estudiante', 'materia', 'promedio', 'cualitativa', 'acciones'];
  dataSource = new MatTableDataSource<GradeRecord>();

  constructor(
    private attendanceService: AttendanceService,
    public authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.attendanceService.getGrades().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openEditDialog(grade: GradeRecord): void {
    const dialogRef = this.dialog.open(GradeDialog, {
      width: '400px',
      data: grade
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.attendanceService.updateGrade(result);
      }
    });
  }

  deleteGrade(id: number, materia: string): void {
    if (confirm('¿Eliminar calificación?')) {
      this.attendanceService.deleteGrade(id, materia);
    }
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
