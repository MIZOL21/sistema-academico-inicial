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
  public readonly currentUser = this._currentUser.asReadonly();

  constructor() { }

  login(user: string, pass: string): boolean {
    if (user === this.credentials.user && pass === this.credentials.pass) {
      this._currentUser.set(user);
      return true;
    }
    return false;
  }

  logout(): void {
    this._currentUser.set(null);
  }

  isLoggedIn(): boolean {
    return this._currentUser() !== null;
  }
}
