import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './Components/calendar/calendar.component';
import { FormCitasComponent } from './Components/citas/form-citas/form-citas.component';
import { ListCitasComponent } from './Components/citas/list-citas/list-citas.component';
import { HeaderComponent } from './Components/header/header.component';
import { HomeComponent } from './Components/home/home.component';
import { ListSignupComponent } from './Components/list-signup/list-signup.component';
import { LoginComponent } from './Components/login/login.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { FormServiciosComponent } from './Components/servicios/form-servicios/form-servicios.component';
import { ListServiciosComponent } from './Components/servicios/list-servicios/list-servicios.component';
import { SignupComponent } from './Components/signup/signup.component';
import { CorporalesComponent } from './Components/web/corporales/corporales.component';
import { DepilacionComponent } from './Components/web/depilacion/depilacion.component';
import { FacialesComponent } from './Components/web/faciales/faciales.component';
import { LaserComponent } from './Components/web/laser/laser.component';
import { ManicurasComponent } from './Components/web/manicuras/manicuras.component';
import { MaquillajesComponent } from './Components/web/maquillajes/maquillajes.component';
import { MasajesComponent } from './Components/web/masajes/masajes.component';
import { MicrobladingComponent } from './Components/web/microblading/microblading.component';
import { PedicurasComponent } from './Components/web/pedicuras/pedicuras.component';
import { PestanasComponent } from './Components/web/pestanas/pestanas.component';
import { AuthGuard } from './Guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'header',
    component: HeaderComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'usuarios',
    component: ListSignupComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'cita/:id',
    component: FormCitasComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'citas',
    component: ListCitasComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'servicio/:id',
    component: FormServiciosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'servicios',
    component: ListServiciosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'calendar',
    component: CalendarComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'corporales',
    component: CorporalesComponent,
  },
  {
    path: 'depilacion',
    component: DepilacionComponent,
  },
  {
    path: 'faciales',
    component: FacialesComponent,
  },
  {
    path: 'laser',
    component: LaserComponent,
  },
  {
    path: 'manicuras',
    component: ManicurasComponent,
  },
  {
    path: 'maquillajes',
    component: MaquillajesComponent,
  },
  {
    path: 'masajes',
    component: MasajesComponent,
  },
  {
    path: 'microblading',
    component: MicrobladingComponent,
  },
  {
    path: 'pedicuras',
    component: PedicurasComponent,
  },
  {
    path: 'pestanas',
    component: PestanasComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
