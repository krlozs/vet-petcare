import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly storageKey = 'petcare-auth';
  private readonly usuario = 'drgarcia';
  private readonly clave = '123456';

  login(usuario: string, clave: string): boolean {
    const credencialesCorrectas = usuario === this.usuario && clave === this.clave;

    if (credencialesCorrectas) {
      sessionStorage.setItem(this.storageKey, 'true');
    }

    return credencialesCorrectas;
  }

  logout(): void {
    sessionStorage.removeItem(this.storageKey);
  }

  estaAutenticado(): boolean {
    return sessionStorage.getItem(this.storageKey) === 'true';
  }
}
