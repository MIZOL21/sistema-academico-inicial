import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { Student } from '../../core/models/student.model';
import { StudentService } from '../../core/services/student.service';
import { AuthService } from '../../core/services/auth.service';
import { StudentDialog } from './student-dialog';
import { ConfirmDialog } from '../../shared/components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-estudiantes',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatCardModule,
    MatDividerModule
  ],
  templateUrl: './estudiantes.html',
  styleUrls: ['./estudiantes.css']
})
export class Estudiantes implements OnInit {
  displayedColumns: string[] = ['cedula', 'nombre', 'correo', 'telefono', 'acciones'];
  dataSource: MatTableDataSource<Student> = new MatTableDataSource<Student>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private studentService: StudentService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    const role = this.authService.currentRole();
    
    if (role === 'DOCENTE') {
      this.displayedColumns = ['cedula', 'nombre', 'promedio', 'asistencia', 'acciones_docente'];
    } else if (role === 'ESTUDIANTE') {
      this.displayedColumns = ['nombre', 'correo']; // Para la vista de tarjetas esto se ignora mayormente
    } else {
      // Admin (default columns)
    }

    this.studentService.getStudents().subscribe(students => {
      this.dataSource.data = students;
    });
  }

  getInitials(nombre: string, apellido: string): string {
    return (nombre[0] + apellido[0]).toUpperCase();
  }

  getAvatarColor(id: number): string {
    const colors = ['#3f51b5', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50'];
    return colors[id % colors.length];
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(student?: Student): void {
    const dialogRef = this.dialog.open(StudentDialog, {
      width: '600px',
      data: student || null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Verificar cédula duplicada
        if (this.studentService.checkCedulaExists(result.cedula, student?.id)) {
          this.snackBar.open('La cédula ya está registrada', 'Cerrar', { duration: 3000, panelClass: ['error-snackbar'] });
          return;
        }

        if (student) {
          this.studentService.updateStudent(result);
          this.snackBar.open('Estudiante actualizado', 'OK', { duration: 2000 });
        } else {
          this.studentService.addStudent(result);
          this.snackBar.open('Estudiante creado', 'OK', { duration: 2000 });
        }
      }
    });
  }

  deleteStudent(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '400px',
      data: {
        title: 'Confirmar eliminación',
        message: '¿Está seguro de que desea eliminar este registro? Esta acción no se puede deshacer.'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.studentService.deleteStudent(id);
        this.snackBar.open('Registro eliminado', 'OK', { duration: 2000 });
      }
    });
  }
}
