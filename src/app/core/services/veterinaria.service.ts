import { Injectable, computed, signal } from '@angular/core';
import { Cita, HistorialAtencion, Mascota, RegistroCita, ResumenVeterinaria } from '../models/veterinaria.models';

@Injectable({
  providedIn: 'root'
})
export class VeterinariaService {
  private readonly mascotasSignal = signal<Mascota[]>([]);
  private readonly citasSignal = signal<Cita[]>([]);
  private readonly historialSignal = signal<HistorialAtencion[]>([]);

  readonly mascotas = this.mascotasSignal.asReadonly();
  readonly citas = this.citasSignal.asReadonly();
  readonly historial = this.historialSignal.asReadonly();

  readonly resumen = computed<ResumenVeterinaria>(() => ({
    totalMascotas: this.mascotasSignal().length,
    citasAgendadas: this.citasSignal().length,
    historiales: this.historialSignal().length
  }));

  registrarMascota(datos: Omit<Mascota, 'id' | 'ultimaVisita' | 'estado'>): Mascota {
    const mascota: Mascota = {
      ...datos,
      id: this.generarId(this.mascotasSignal()),
      ultimaVisita: 'Hoy',
      estado: 'Al dia'
    };

    this.mascotasSignal.update((mascotas) => [...mascotas, mascota]);
    return mascota;
  }

  agendarCita(datos: Omit<Cita, 'id' | 'estado'>): Cita {
    const registro = new RegistroCita(this.generarId(this.citasSignal()), 'pendiente');
    const cita: Cita = {
      ...datos,
      id: registro.obtenerCodigo(),
      estado: registro.obtenerEstado()
    };

    this.citasSignal.update((citas) => [...citas, cita]);
    return cita;
  }

  cerrarCita(cita: Cita, estado: 'completado' | 'seguimiento'): void {
    const atencion: HistorialAtencion = {
      id: this.generarId(this.historialSignal()),
      fecha: 'Hoy',
      fechaIso: this.obtenerFechaActual(),
      mascota: cita.mascota,
      motivo: cita.motivo,
      veterinario: cita.veterinario,
      estado,
      diagnostico: cita.notas || 'Atencion registrada desde la agenda de citas.',
      tratamiento: estado === 'seguimiento'
        ? 'Se requiere seguimiento en una proxima visita.'
        : 'Atencion completada satisfactoriamente.'
    };

    this.historialSignal.update((historial) => [...historial, atencion]);
    this.eliminarCita(cita.id);
  }

  eliminarCita(id: number): void {
    this.citasSignal.update((citas) => citas.filter((cita) => cita.id !== id));
  }

  actualizarCita(id: number, datos: Omit<Cita, 'id' | 'estado'>): void {
    this.citasSignal.update((citas) =>
      citas.map((cita) =>
        cita.id === id
          ? {
              ...cita,
              ...datos
            }
          : cita
      )
    );
  }

  private generarId<T extends { id: number }>(lista: T[]): number {
    return lista.length ? Math.max(...lista.map((item) => item.id)) + 1 : 1;
  }

  private obtenerFechaActual(): string {
    return new Date().toISOString().slice(0, 10);
  }
}
