import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Cita } from '../core/models/veterinaria.models';
import { AuthService } from '../core/services/auth.service';
import { VeterinariaService } from '../core/services/veterinaria.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  constructor(
    public readonly veterinariaService: VeterinariaService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  get citasRecientes(): Cita[] {
    return this.veterinariaService.citas().slice(-3).reverse();
  }

  get proximaCita(): Cita | null {
    return this.veterinariaService
      .citas()
      .slice()
      .sort((a, b) => `${a.fecha} ${a.hora}`.localeCompare(`${b.fecha} ${b.hora}`))[0] ?? null;
  }

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
