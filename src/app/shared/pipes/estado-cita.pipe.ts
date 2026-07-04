import { Pipe, PipeTransform } from '@angular/core';
import { EstadoCita } from '../../core/models/veterinaria.models';

@Pipe({
  name: 'estadoCita'
})
export class EstadoCitaPipe implements PipeTransform {
  transform(estado: EstadoCita): string {
    const estados: Record<EstadoCita, string> = {
      confirmada: 'Confirmada',
      pendiente: 'Pendiente',
      cancelada: 'Cancelada'
    };

    return estados[estado];
  }
}
