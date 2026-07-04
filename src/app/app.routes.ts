import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { CitasComponent } from './pages/citas.component';
import { DashboardComponent } from './pages/dashboard.component';
import { HistorialComponent } from './pages/historial.component';
import { LoginComponent } from './pages/login.component';
import { MascotasComponent } from './pages/mascotas.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, title: 'Veterinaria PetCare | Login' },
  { path: '', component: DashboardComponent, title: 'Veterinaria PetCare | Inicio', canActivate: [authGuard] },
  { path: 'mascotas', component: MascotasComponent, title: 'Veterinaria PetCare | Mascotas', canActivate: [authGuard] },
  { path: 'citas', component: CitasComponent, title: 'Veterinaria PetCare | Citas', canActivate: [authGuard] },
  { path: 'historial', component: HistorialComponent, title: 'Veterinaria PetCare | Historial', canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];
