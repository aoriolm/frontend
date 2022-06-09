import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { MostrarServicioPipe } from './Pipes/mostrar-servicio.pipe';
import { MostrarUsuarioPipe } from './Pipes/mostrar-usuario.pipe';
import { AuthInterceptorService } from './Services/auth-interceptor.service';
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

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin,
]);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    FormCitasComponent,
    HomeComponent,
    FormServiciosComponent,
    ListServiciosComponent,
    CalendarComponent,
    ListCitasComponent,
    ListSignupComponent,
    MostrarUsuarioPipe,
    MostrarServicioPipe,
    CorporalesComponent,
    DepilacionComponent,
    FacialesComponent,
    LaserComponent,
    ManicurasComponent,
    MaquillajesComponent,
    MasajesComponent,
    MicrobladingComponent,
    PedicurasComponent,
    PestanasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FullCalendarModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
