import { Injectable, signal, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Credenciales en variable pública según requerimiento
  public readonly credentials = {
    user: 'admin',
    pass: '1234'
  };

  private readonly SESSION_KEY = 'sistema_academico_session';
  
  // Estado de la sesión usando signals
  private readonly _currentUser = signal<string | null>(null);
  private readonly _currentRole = signal<string | null>(null);
  
  public readonly currentUser = this._currentUser.asReadonly();
  public readonly currentRole = this._currentRole.asReadonly();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.loadSession();
  }

  private loadSession(): void {
    if (isPlatformBrowser(this.platformId)) {
      const session = localStorage.getItem(this.SESSION_KEY);
      if (session) {
        const { user, role } = JSON.parse(session);
        this._currentUser.set(user);
        this._currentRole.set(role);
      }
    }
  }

  login(user: string, pass: string): boolean {
    let role = '';
    if (user === 'admin' && pass === '1234') role = 'ADMIN';
    else if (user === 'docente' && pass === '1234') role = 'DOCENTE';
    else if (user === 'estudiante' && pass === '1234') role = 'ESTUDIANTE';

    if (role) {
      this._currentUser.set(user);
      this._currentRole.set(role);
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem(this.SESSION_KEY, JSON.stringify({ user, role }));
      }
      return true;
    }
    return false;
  }

  logout(): void {
    this._currentUser.set(null);
    this._currentRole.set(null);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.SESSION_KEY);
    }
  }

  isLoggedIn(): boolean {
    return this._currentUser() !== null;
  }

  isAdmin(): boolean {
    return this._currentRole() === 'ADMIN';
  }
}
