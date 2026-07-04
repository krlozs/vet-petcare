import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Mascota } from '../core/models/veterinaria.models';
import { AuthService } from '../core/services/auth.service';
import { VeterinariaService } from '../core/services/veterinaria.service';

@Component({
  selector: 'app-mascotas',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './mascotas.component.html'
})
export class MascotasComponent {
  private readonly formBuilder = inject(FormBuilder);

  mensaje = '';
  mostrarFormulario = false;
  terminoBusqueda = '';

  readonly mascotaForm = this.formBuilder.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    especie: ['Perro', Validators.required],
    raza: ['', Validators.required],
    edad: [1, [Validators.required, Validators.min(0)]],
    sexo: ['Macho', Validators.required],
    dueno: ['', Validators.required],
    telefono: ['', Validators.required]
  });

  constructor(
    private readonly veterinariaService: VeterinariaService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  get mascotasExtra(): Array<{ nombre: string; especie: string; edad: number; sexo: string; duenio: string; telefono: string; visita: string; estado: string }> {
    return this.veterinariaService.mascotas().map((mascota) => ({
      nombre: mascota.nombre,
      especie: mascota.especie,
      edad: mascota.edad,
      sexo: mascota.sexo,
      duenio: mascota.dueno.nombre,
      telefono: mascota.dueno.telefono,
      visita: mascota.ultimaVisita,
      estado: mascota.estado
    }));
  }

  get mascotasExtraFiltradas(): Array<{ nombre: string; especie: string; edad: number; sexo: string; duenio: string; telefono: string; visita: string; estado: string }> {
    return this.mascotasExtra.filter((mascota) => this.mostrarMascota(mascota.nombre, mascota.especie, mascota.duenio));
  }

  alternarFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
    this.mensaje = this.mostrarFormulario ? 'Completa los datos de la mascota y su dueno.' : '';
  }

  registrarMascota(): void {
    if (this.mascotaForm.invalid) {
      this.mascotaForm.markAllAsTouched();
      this.mensaje = 'Completa los campos obligatorios antes de registrar.';
      return;
    }

    const datos = this.mascotaForm.getRawValue();
    this.veterinariaService.registrarMascota({
      nombre: datos.nombre,
      especie: datos.especie as Mascota['especie'],
      raza: datos.raza,
      edad: Number(datos.edad),
      sexo: datos.sexo as Mascota['sexo'],
      dueno: {
        nombre: datos.dueno,
        telefono: datos.telefono
      }
    });

    this.mascotaForm.reset({
      nombre: '',
      especie: 'Perro',
      raza: '',
      edad: 1,
      sexo: 'Macho',
      dueno: '',
      telefono: ''
    });
    this.mostrarFormulario = false;
    this.mensaje = 'Mascota registrada correctamente.';
  }

  buscarMascotas(texto: string): void {
    this.terminoBusqueda = texto.trim().toLowerCase();
  }

  mostrarMascota(nombre: string, especie: string, duenio: string): boolean {
    if (!this.terminoBusqueda) {
      return true;
    }

    return `${nombre} ${especie} ${duenio}`.toLowerCase().includes(this.terminoBusqueda);
  }

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
