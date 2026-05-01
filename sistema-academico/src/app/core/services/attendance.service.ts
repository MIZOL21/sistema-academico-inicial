import { Injectable, PLATFORM_ID, Inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

export interface AttendanceRecord {
  studentId: number;
  studentName: string;
  date: string;
  status: 'presente' | 'ausente' | 'atraso' | 'justificado';
}

export interface GradeRecord {
  studentId: number;
  studentName: string;
  materia: string;
  parcial1: number;
  parcial2: number;
  examen: number;
  promedio: number;
}

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private readonly ATTENDANCE_KEY = 'sistema_academico_attendance';
  private readonly GRADES_KEY = 'sistema_academico_grades';
  
  private attendanceRecords: AttendanceRecord[] = [];
  private gradeRecords: GradeRecord[] = [];
  
  private attendanceSubject = new BehaviorSubject<AttendanceRecord[]>([]);
  private gradesSubject = new BehaviorSubject<GradeRecord[]>([]);
  
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.initData();
  }

  private initData(): void {
    if (!this.isBrowser) return;

    // Cargar asistencia
    const attData = localStorage.getItem(this.ATTENDANCE_KEY);
    if (attData) {
      this.attendanceRecords = JSON.parse(attData);
    } else {
      this.attendanceRecords = [
        { studentId: 1, studentName: 'Juan Pérez', date: new Date().toISOString().split('T')[0], status: 'presente' },
        { studentId: 2, studentName: 'María García', date: new Date().toISOString().split('T')[0], status: 'presente' },
        { studentId: 3, studentName: 'Carlos Rodríguez', date: new Date().toISOString().split('T')[0], status: 'ausente' }
      ];
      this.saveAttendance();
    }

    // Cargar calificaciones
    const gradeData = localStorage.getItem(this.GRADES_KEY);
    if (gradeData) {
      this.gradeRecords = JSON.parse(gradeData);
    } else {
      this.gradeRecords = [
        { studentId: 1, studentName: 'Juan Pérez', materia: 'Matemáticas', parcial1: 8.5, parcial2: 9.0, examen: 8.0, promedio: 8.5 },
        { studentId: 2, studentName: 'María García', materia: 'Matemáticas', parcial1: 9.5, parcial2: 10, examen: 9.0, promedio: 9.5 },
        { studentId: 3, studentName: 'Carlos Rodríguez', materia: 'Matemáticas', parcial1: 6.0, parcial2: 7.0, examen: 6.5, promedio: 6.5 }
      ];
      this.saveGrades();
    }

    this.attendanceSubject.next(this.attendanceRecords);
    this.gradesSubject.next(this.gradeRecords);
  }

  private saveAttendance(): void {
    if (this.isBrowser) localStorage.setItem(this.ATTENDANCE_KEY, JSON.stringify(this.attendanceRecords));
  }

  private saveGrades(): void {
    if (this.isBrowser) localStorage.setItem(this.GRADES_KEY, JSON.stringify(this.gradeRecords));
  }

  getAttendanceByDate(date: string): Observable<AttendanceRecord[]> {
    return this.attendanceSubject.asObservable();
  }

  getGrades(): Observable<GradeRecord[]> {
    return this.gradesSubject.asObservable();
  }

  markAllPresent(date: string, students: {id: number, name: string}[]): void {
    students.forEach(s => {
      const index = this.attendanceRecords.findIndex(r => r.studentId === s.id && r.date === date);
      if (index !== -1) {
        this.attendanceRecords[index].status = 'presente';
      } else {
        this.attendanceRecords.push({
          studentId: s.id,
          studentName: s.name,
          date: date,
          status: 'presente'
        });
      }
    });
    this.saveAttendance();
    this.attendanceSubject.next(this.attendanceRecords);
  }

  updateAttendance(record: AttendanceRecord): void {
    const index = this.attendanceRecords.findIndex(r => r.studentId === record.studentId && r.date === record.date);
    if (index !== -1) {
      this.attendanceRecords[index] = record;
    } else {
      this.attendanceRecords.push(record);
    }
    this.saveAttendance();
    this.attendanceSubject.next(this.attendanceRecords);
  }

  updateGrade(record: GradeRecord): void {
    const index = this.gradeRecords.findIndex(r => r.studentId === record.studentId && r.materia === record.materia);
    if (index !== -1) {
      record.promedio = Number(((record.parcial1 + record.parcial2 + record.examen) / 3).toFixed(2));
      this.gradeRecords[index] = record;
      this.saveGrades();
      this.gradesSubject.next(this.gradeRecords);
    }
  }

  getAbsenceCount(studentId: number): number {
    return this.attendanceRecords.filter(r => r.studentId === studentId && r.status === 'ausente').length;
  }
}
