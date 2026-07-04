import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Cita } from '../core/models/veterinaria.models';
import { AuthService } from '../core/services/auth.service';
import { VeterinariaService } from '../core/services/veterinaria.service';
import { CitaProximaDirective } from '../shared/directives/cita-proxima.directive';
import { EstadoCitaPipe } from '../shared/pipes/estado-cita.pipe';

@Component({
  selector: 'app-citas',
  imports: [RouterLink, ReactiveFormsModule, EstadoCitaPipe, CitaProximaDirective],
  templateUrl: './citas.component.html'
})
export class CitasComponent {
  private readonly formBuilder = inject(FormBuilder);

  mensaje = '';
  diasSemana = this.generarDiasSemana(new Date());
  semana = this.obtenerTextoSemana(this.diasSemana);
  citaEditandoId: number | null = null;

  readonly citaForm = this.formBuilder.nonNullable.group({
    mascota: ['', Validators.required],
    motivo: ['Consulta General', Validators.required],
    fecha: ['', Validators.required],
    hora: ['', Validators.required],
    notas: ['']
  });

  constructor(
    public readonly veterinariaService: VeterinariaService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  get mascotas(): MascotaOpcion[] {
    return this.veterinariaService.mascotas().map((mascota) => ({
      nombre: mascota.nombre,
      texto: `${mascota.nombre} (${mascota.especie})`
    }));
  }

  get citasExtra(): Cita[] {
    return this.veterinariaService.citas();
  }

  agendarCita(): void {
    if (this.citaForm.invalid) {
      this.citaForm.markAllAsTouched();
      this.mensaje = 'Completa mascota, motivo, fecha y hora.';
      return;
    }

    const datos = this.citaForm.getRawValue();
    const cita = {
      mascota: datos.mascota,
      motivo: datos.motivo,
      fecha: datos.fecha,
      hora: datos.hora,
      veterinario: 'Dr. Garcia',
      notas: datos.notas
    };

    if (this.citaEditandoId) {
      this.veterinariaService.actualizarCita(this.citaEditandoId, cita);
      this.mensaje = 'Cita actualizada correctamente.';
    } else {
      this.veterinariaService.agendarCita(cita);
      this.mensaje = 'Cita registrada correctamente.';
    }

    this.citaForm.reset({
      mascota: '',
      motivo: 'Consulta General',
      fecha: '',
      hora: '',
      notas: ''
    });
    this.citaEditandoId = null;
  }

  cambiarSemana(direccion: 'anterior' | 'siguiente'): void {
    const fechaBase = new Date(this.diasSemana[0].fecha);
    fechaBase.setDate(fechaBase.getDate() + (direccion === 'anterior' ? -7 : 7));
    this.diasSemana = this.generarDiasSemana(fechaBase);
    this.semana = this.obtenerTextoSemana(this.diasSemana);
  }

  eliminarCitaRegistrada(cita: Cita): void {
    this.veterinariaService.eliminarCita(cita.id);
    this.mensaje = `Cita de ${cita.mascota} eliminada.`;
  }

  editarCitaRegistrada(cita: Cita): void {
    this.citaEditandoId = cita.id;
    this.citaForm.patchValue({
      mascota: cita.mascota,
      motivo: cita.motivo,
      fecha: cita.fecha,
      hora: cita.hora,
      notas: cita.notas
    });
    this.mensaje = `Editando cita de ${cita.mascota}. Guarda para actualizar.`;
  }

  completarCita(cita: Cita): void {
    this.veterinariaService.cerrarCita(cita, 'completado');
    this.mensaje = `Cita de ${cita.mascota} enviada al historial como completada.`;
  }

  enviarASeguimiento(cita: Cita): void {
    this.veterinariaService.cerrarCita(cita, 'seguimiento');
    this.mensaje = `Cita de ${cita.mascota} enviada al historial como seguimiento.`;
  }

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  private generarDiasSemana(fecha: Date): DiaSemana[] {
    const inicio = new Date(fecha);
    const diaActual = inicio.getDay() || 7;
    inicio.setDate(inicio.getDate() - diaActual + 1);

    const nombres = ['LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB', 'DOM'];
    const hoy = new Date().toISOString().slice(0, 10);

    return nombres.map((nombre, indice) => {
      const fechaDia = new Date(inicio);
      fechaDia.setDate(inicio.getDate() + indice);
      const fechaIso = fechaDia.toISOString().slice(0, 10);

      return {
        nombre,
        numero: fechaDia.getDate(),
        fecha: fechaIso,
        esHoy: fechaIso === hoy
      };
    });
  }

  private obtenerTextoSemana(dias: DiaSemana[]): string {
    const inicio = dias[0];
    const fin = dias[dias.length - 1];

    return `Semana del ${inicio.numero} al ${fin.numero}`;
  }
}

interface MascotaOpcion {
  nombre: string;
  texto: string;
}

interface DiaSemana {
  nombre: string;
  numero: number;
  fecha: string;
  esHoy: boolean;
}
