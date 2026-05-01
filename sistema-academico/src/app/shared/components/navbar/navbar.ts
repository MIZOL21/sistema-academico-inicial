import { Component, inject } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatMenuModule, MatIconModule, MatButtonModule, MatDividerModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private router = inject(Router);
  public authService = inject(AuthService);

  logout() {
    this.authService.logout();
    console.log('Sesion cerrada');
    this.router.navigate(['/login']);
  }

  viewProfile() {
    this.router.navigate(['/perfil']);
  }

  viewSettings() {
    this.router.navigate(['/configuracion']);
  }
}
