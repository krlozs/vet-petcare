import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HistorialAtencion } from '../core/models/veterinaria.models';
import { AuthService } from '../core/services/auth.service';
import { VeterinariaService } from '../core/services/veterinaria.service';

@Component({
  selector: 'app-historial',
  imports: [RouterLink],
  templateUrl: './historial.component.html'
})
export class HistorialComponent {
  mensaje = '';
  detalleAbierto = 0;
  terminoBusqueda = '';
  fechaDesde = '';
  fechaHasta = '';
  private readonly mascotasSeleccionadas = new Set<string>();

  constructor(
    private readonly veterinariaService: VeterinariaService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  get entradasExtra(): HistorialAtencion[] {
    return this.veterinariaService
      .historial()
      .filter((entrada) => this.mostrarRegistro(entrada.mascota) && this.mostrarPorFecha(entrada.fechaIso));
  }

  get mascotasFiltroExtra(): Array<{ nombre: string; detalle: string; inicial: string }> {
    return this.veterinariaService
      .mascotas()
      .map((mascota) => ({
        nombre: mascota.nombre,
        detalle: mascota.raza || mascota.especie,
        inicial: mascota.nombre.charAt(0).toUpperCase()
      }));
  }

  buscarHistorial(texto: string): void {
    this.terminoBusqueda = texto.trim().toLowerCase();
    this.detalleAbierto = 0;
  }

  cambiarFiltroMascota(mascota: string, event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.checked) {
      this.mascotasSeleccionadas.add(mascota);
    } else {
      this.mascotasSeleccionadas.delete(mascota);
    }

    this.detalleAbierto = 0;
  }

  cambiarFechaDesde(fecha: string): void {
    this.fechaDesde = fecha;
    this.detalleAbierto = 0;
  }

  cambiarFechaHasta(fecha: string): void {
    this.fechaHasta = fecha;
    this.detalleAbierto = 0;
  }

  mostrarRegistro(mascota: string): boolean {
    const coincideMascota = this.mascotasSeleccionadas.size === 0 || this.mascotasSeleccionadas.has(mascota);
    const coincideBusqueda = !this.terminoBusqueda || mascota.toLowerCase().includes(this.terminoBusqueda);

    return coincideMascota && coincideBusqueda;
  }

  mostrarPorFecha(fechaIso: string): boolean {
    const cumpleDesde = !this.fechaDesde || fechaIso >= this.fechaDesde;
    const cumpleHasta = !this.fechaHasta || fechaIso <= this.fechaHasta;

    return cumpleDesde && cumpleHasta;
  }

  toggleDetails(id: number): void {
    this.detalleAbierto = this.detalleAbierto === id ? 0 : id;
  }

  textoEstado(estado: HistorialAtencion['estado']): string {
    return estado === 'seguimiento' ? 'Seguimiento' : 'Completado';
  }

  claseEstado(estado: HistorialAtencion['estado']): string {
    return estado === 'seguimiento'
      ? 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary/10 text-secondary'
      : 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-tertiary-fixed/20 text-on-tertiary-fixed-variant';
  }

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
