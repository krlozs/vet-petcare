import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  mensaje = '';

  readonly loginForm = this.formBuilder.nonNullable.group({
    usuario: ['', Validators.required],
    clave: ['', Validators.required]
  });

  ingresar(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.mensaje = 'Ingresa usuario y contraseña.';
      return;
    }

    const datos = this.loginForm.getRawValue();
    const loginCorrecto = this.authService.login(datos.usuario, datos.clave);

    if (loginCorrecto) {
      this.router.navigateByUrl('/');
      return;
    }

    this.mensaje = 'Usuario o contraseña incorrectos.';
  }
}
