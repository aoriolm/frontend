import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormCitasComponent } from './Components/citas/form-citas/form-citas.component';
import { HeaderComponent } from './Components/header/header.component';
import { LoginComponent } from './Components/login/login.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { SignupComponent } from './Components/signup/signup.component';
const routes: Routes = [
  {
    path: '',
    component: HeaderComponent,
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
    path: 'form-citas',
    component: FormCitasComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
