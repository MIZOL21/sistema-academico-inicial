import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Student } from '../../core/models/student.model';
import { StudentService } from '../../core/services/student.service';
import { StudentDialog } from './student-dialog';

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
    MatTooltipModule
  ],
  templateUrl: './estudiantes.html',
  styleUrls: ['./estudiantes.css']
})
export class Estudiantes implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['cedula', 'nombre', 'apellido', 'correo', 'acciones'];
  dataSource = new MatTableDataSource<Student>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private studentService: StudentService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.studentService.getStudents().subscribe(students => {
      this.dataSource.data = students;
    });
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
      width: '500px',
      data: student || null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (student) {
          this.studentService.updateStudent(result);
        } else {
          this.studentService.addStudent(result);
        }
      }
    });
  }

  deleteStudent(id: number): void {
    if (confirm('¿Eliminar registro?')) {
      this.studentService.deleteStudent(id);
    }
  }
}
