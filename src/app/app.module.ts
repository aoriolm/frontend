import { HttpClientModule } from '@angular/common/http';
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
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { HeaderComponent } from './Components/header/header.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { FormServiciosComponent } from './Components/servicios/form-servicios/form-servicios.component';
import { ListServiciosComponent } from './Components/servicios/list-servicios/list-servicios.component';
import { SignupComponent } from './Components/signup/signup.component';
import { ListCitasComponent } from './Components/citas/list-citas/list-citas.component';

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
    DashboardComponent,
    FormServiciosComponent,
    ListServiciosComponent,
    CalendarComponent,
    ListCitasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FullCalendarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
