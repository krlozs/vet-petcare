export type EspecieMascota = 'Perro' | 'Gato' | 'Conejo' | 'Hamster' | 'Otro';
export type EstadoMascota = 'Al dia' | 'Pendiente Vacuna';
export type EstadoCita = 'confirmada' | 'pendiente' | 'cancelada';
export type EstadoHistorial = 'completado' | 'seguimiento';

export interface Dueno {
  nombre: string;
  telefono: string;
}

export interface Mascota {
  id: number;
  nombre: string;
  especie: EspecieMascota;
  raza: string;
  edad: number;
  sexo: 'Macho' | 'Hembra';
  dueno: Dueno;
  ultimaVisita: string;
  estado: EstadoMascota;
}

export interface Cita {
  id: number;
  mascota: string;
  motivo: string;
  fecha: string;
  hora: string;
  veterinario: string;
  estado: EstadoCita;
  notas: string;
}

export interface HistorialAtencion {
  id: number;
  fecha: string;
  fechaIso: string;
  mascota: string;
  motivo: string;
  veterinario: string;
  estado: EstadoHistorial;
  diagnostico: string;
  tratamiento: string;
}

export interface ResumenVeterinaria {
  totalMascotas: number;
  citasAgendadas: number;
  historiales: number;
}

export class RegistroBase {
  constructor(private readonly codigo: number) {}

  obtenerCodigo(): number {
    return this.codigo;
  }
}

export class RegistroCita extends RegistroBase {
  constructor(codigo: number, private estado: EstadoCita) {
    super(codigo);
  }

  cambiarEstado(nuevoEstado: EstadoCita): void {
    this.estado = nuevoEstado;
  }

  obtenerEstado(): EstadoCita {
    return this.estado;
  }
}
