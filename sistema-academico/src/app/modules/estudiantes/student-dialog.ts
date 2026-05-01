import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Student } from '../../core/models/student.model';

@Component({
  selector: 'app-student-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './student-dialog.html',
  styleUrls: ['./student-dialog.css']
})
export class StudentDialog {
  studentForm: FormGroup;
  isEdit: boolean;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<StudentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Student
  ) {
    this.isEdit = !!data;
    this.studentForm = this.fb.group({
      id: [data?.id || null],
      cedula: [data?.cedula || '', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      nombre: [data?.nombre || '', Validators.required],
      apellido: [data?.apellido || '', Validators.required],
      correo: [data?.correo || '', [Validators.required, Validators.email]],
      telefono: [data?.telefono || '', Validators.required],
      fechaNacimiento: [data?.fechaNacimiento || '', Validators.required]
    });
  }

  onSave(): void {
    if (this.studentForm.valid) {
      this.dialogRef.close(this.studentForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
