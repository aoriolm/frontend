import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormCitasComponent } from './Components/citas/form-citas/form-citas.component';
import { ListCitasComponent } from './Components/citas/list-citas/list-citas.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { HeaderComponent } from './Components/header/header.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { FormServiciosComponent } from './Components/servicios/form-servicios/form-servicios.component';
import { ListServiciosComponent } from './Components/servicios/list-servicios/list-servicios.component';
import { SignupComponent } from './Components/signup/signup.component';
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
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'citas/:id',
    component: FormCitasComponent,
  },
  {
    path: 'citas',
    component: ListCitasComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'servicios/:id',
    component: FormServiciosComponent,
  },
  {
    path: 'servicios',
    component: ListServiciosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
