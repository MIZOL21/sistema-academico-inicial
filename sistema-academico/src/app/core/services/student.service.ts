import { Injectable, PLATFORM_ID, Inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private readonly STORAGE_KEY = 'sistema_academico_students';
  private students: Student[] = [];
  private studentsSubject = new BehaviorSubject<Student[]>([]);
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    if (!this.isBrowser) return;

    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      this.students = JSON.parse(data);
    } else {
      // Default initial data if storage is empty
      this.students = [
        { id: 1, cedula: '0912345678', nombre: 'Juan', apellido: 'Pérez', correo: 'juan.perez@example.com', telefono: '0998877665', fechaNacimiento: '2000-05-15', promedio: 8.5, asistencia: 95 },
        { id: 2, cedula: '0923456789', nombre: 'María', apellido: 'García', correo: 'maria.garcia@example.com', telefono: '0987654321', fechaNacimiento: '1999-10-22', promedio: 9.2, asistencia: 100 },
        { id: 3, cedula: '0934567890', nombre: 'Carlos', apellido: 'Rodríguez', correo: 'carlos.rod@example.com', telefono: '0976543210', fechaNacimiento: '2001-01-30', promedio: 7.8, asistencia: 85 },
        { id: 4, cedula: '0945678901', nombre: 'Ana', apellido: 'Martínez', correo: 'ana.mtz@example.com', telefono: '0965432109', fechaNacimiento: '2002-08-12', promedio: 9.5, asistencia: 98 },
        { id: 5, cedula: '0956789012', nombre: 'Luis', apellido: 'Sánchez', correo: 'luis.sanchez@example.com', telefono: '0954321098', fechaNacimiento: '2000-12-05', promedio: 6.4, asistencia: 75 }
      ];
      this.saveToStorage();
    }
    this.studentsSubject.next(this.students);
  }

  private saveToStorage(): void {
    if (this.isBrowser) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.students));
    }
  }

  getStudents(): Observable<Student[]> {
    return this.studentsSubject.asObservable();
  }

  checkCedulaExists(cedula: string, excludeId?: number): boolean {
    return this.students.some(s => s.cedula === cedula && s.id !== excludeId);
  }

  addStudent(student: Student): void {
    student.id = this.students.length > 0 ? Math.max(...this.students.map(s => s.id)) + 1 : 1;
    this.students = [...this.students, student];
    this.saveToStorage();
    this.studentsSubject.next(this.students);
  }

  updateStudent(updatedStudent: Student): void {
    this.students = this.students.map(s => s.id === updatedStudent.id ? updatedStudent : s);
    this.saveToStorage();
    this.studentsSubject.next(this.students);
  }

  deleteStudent(id: number): void {
    this.students = this.students.filter(s => s.id !== id);
    this.saveToStorage();
    this.studentsSubject.next(this.students);
  }
}
