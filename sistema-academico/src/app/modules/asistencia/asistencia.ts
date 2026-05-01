import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { AttendanceService, AttendanceRecord } from '../../core/services/attendance.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-asistencia',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
    MatCardModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './asistencia.html',
  styleUrls: ['./asistencia.css']
})
export class Asistencia implements OnInit {
  displayedColumns: string[] = ['estudiante', 'fecha', 'estado'];
  dataSource: AttendanceRecord[] = [];
  currentDate: string = new Date().toISOString().split('T')[0];

  constructor(
    private attendanceService: AttendanceService,
    public authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadAttendance();
  }

  loadAttendance(): void {
    this.attendanceService.getAttendanceByDate(this.currentDate).subscribe(data => {
      this.dataSource = data.filter(r => r.date === this.currentDate);
    });
  }

  onDateChange(): void {
    this.loadAttendance();
  }

  markAllAsPresent(): void {
    const students = this.dataSource.map(r => ({ id: r.studentId, name: r.studentName }));
    this.attendanceService.markAllPresent(this.currentDate, students);
    this.snackBar.open('Todos los estudiantes marcados como Presente', 'OK', { duration: 2000 });
  }

  getAbsenceAlert(studentId: number): boolean {
    return this.attendanceService.getAbsenceCount(studentId) >= 3;
  }

  onStatusChange(record: AttendanceRecord, newStatus: any): void {
    if (!this.authService.isAdmin() && this.authService.currentRole() !== 'DOCENTE') {
      this.snackBar.open('No tienes permiso para modificar la asistencia', 'Cerrar', { duration: 3000 });
      return;
    }

    const updatedRecord = { ...record, status: newStatus };
    this.attendanceService.updateAttendance(updatedRecord);
    this.snackBar.open(`Asistencia de ${record.studentName} actualizada`, 'OK', { duration: 2000 });
  }
}
