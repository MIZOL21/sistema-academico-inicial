import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

// Angular Material Imports
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatCardModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user = '';
  pass = '';
  message = signal('');
  isError = signal(false);

  private authService = inject(AuthService);
  private router = inject(Router);

  onLogin() {
    if (this.authService.login(this.user, this.pass)) {
      this.message.set('¡Acceso concedido!');
      this.isError.set(false);
      setTimeout(() => this.router.navigate(['/dashboard']), 1000);
    } else {
      this.message.set('Error en credenciales');
      this.isError.set(true);
    }
  }
}
