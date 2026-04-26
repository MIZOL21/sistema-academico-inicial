import { Component, inject } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatMenuModule, MatIconModule, MatButtonModule, MatDividerModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private router = inject(Router);

  logout() {
    console.log('Cerrar sesión');
    this.router.navigate(['/login']);
  }

  viewProfile() {
    this.router.navigate(['/perfil']);
  }

  viewSettings() {
    this.router.navigate(['/configuracion']);
  }
}
