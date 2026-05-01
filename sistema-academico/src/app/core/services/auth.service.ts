import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Credenciales en variable pública según requerimiento
  public readonly credentials = {
    user: 'admin',
    pass: '1234'
  };

  // Estado de la sesión usando signals
  private readonly _currentUser = signal<string | null>(null);
  private readonly _currentRole = signal<string | null>(null);
  
  public readonly currentUser = this._currentUser.asReadonly();
  public readonly currentRole = this._currentRole.asReadonly();

  constructor() { }

  login(user: string, pass: string): boolean {
    // Simulación de login con roles
    if (user === 'admin' && pass === '1234') {
      this._currentUser.set(user);
      this._currentRole.set('ADMIN');
      return true;
    } else if (user === 'docente' && pass === '1234') {
      this._currentUser.set(user);
      this._currentRole.set('DOCENTE');
      return true;
    } else if (user === 'estudiante' && pass === '1234') {
      this._currentUser.set(user);
      this._currentRole.set('ESTUDIANTE');
      return true;
    }
    return false;
  }

  logout(): void {
    this._currentUser.set(null);
    this._currentRole.set(null);
  }

  isLoggedIn(): boolean {
    return this._currentUser() !== null;
  }

  isAdmin(): boolean {
    return this._currentRole() === 'ADMIN';
  }
}
