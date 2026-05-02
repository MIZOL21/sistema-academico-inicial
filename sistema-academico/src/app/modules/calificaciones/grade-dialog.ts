import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { GradeRecord } from '../../core/services/attendance.service';

@Component({
  selector: 'app-grade-dialog',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule],
  template: `
    <h2 mat-dialog-title>Modificar Calificación</h2>
    <mat-dialog-content>
      <p>Estudiante: {{ data.studentName }}</p>
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Parcial 1</mat-label>
        <input matInput type="number" [(ngModel)]="data.parcial1">
      </mat-form-field>
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Parcial 2</mat-label>
        <input matInput type="number" [(ngModel)]="data.parcial2">
      </mat-form-field>
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Examen</mat-label>
        <input matInput type="number" [(ngModel)]="data.examen">
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onNoClick()">Cancelar</button>
      <button mat-raised-button color="primary" [mat-dialog-close]="data">Guardar</button>
    </mat-dialog-actions>
  `,
  styles: ['.full-width { width: 100%; margin-bottom: 10px; }']
})
export class GradeDialog {
  constructor(
    public dialogRef: MatDialogRef<GradeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: GradeRecord
  ) {
    // Clonamos la data para no modificar el original directamente
    this.data = { ...data };
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
