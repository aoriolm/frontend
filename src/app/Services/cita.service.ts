import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CitaDTO } from '../Models/cita.dto';
import { EventDTO } from '../Models/event.dto';

@Injectable({
  providedIn: 'root',
})
export class CitaService {
  private urlApi: string;

  constructor(private http: HttpClient) {
    this.urlApi = 'http://localhost:9000/Api/';
  }

  crearCita(cita: CitaDTO): Observable<CitaDTO> {
    return this.http.post<CitaDTO>(this.urlApi + 'citas', cita);
  }

  obtenerCitas(): Observable<CitaDTO[]> {
    return this.http.get<CitaDTO[]>(this.urlApi + 'citas');
  }

  getCitabyId(cita: string): Observable<CitaDTO> {
    return this.http.get<CitaDTO>(this.urlApi + 'citas/' + cita);
  }

  updateCita(idCita: string, cita: CitaDTO): Observable<CitaDTO> {
    return this.http.put<CitaDTO>(this.urlApi + 'citas/' + idCita, cita);
  }

  crearEvent(event: EventDTO): Observable<EventDTO> {
    return this.http.post<EventDTO>(this.urlApi + 'events', event);
  }

  obtenerEvents(): Observable<EventDTO[]> {
    return this.http.get<EventDTO[]>(this.urlApi + 'events');
  }

  obtenerEventByStart(start: Date): Observable<EventDTO> {
    return this.http.get<EventDTO>(this.urlApi + 'events/' + start);
  }

  updateEvent(idEvent: string, event: EventDTO): Observable<EventDTO> {
    return this.http.put<EventDTO>(this.urlApi + 'events/' + idEvent, event);
  }
}
