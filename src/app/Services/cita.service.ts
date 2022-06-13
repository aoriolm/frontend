import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CitaDTO } from '../Models/cita.dto';
import { EventDTO } from '../Models/event.dto';

interface deleteRes {
  deletedCount: number;
}

@Injectable({
  providedIn: 'root',
})
export class CitaService {
  private urlApi: string;

  constructor(private http: HttpClient) {
    this.urlApi = 'https://sheyla-homs.herokuapp.com/api/';
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

  deleteCita(cita: string): Observable<deleteRes> {
    return this.http.delete<deleteRes>(this.urlApi + 'citas/' + cita);
  }

  crearEvent(event: EventDTO): Observable<EventDTO> {
    return this.http.post<EventDTO>(this.urlApi + 'events', event);
  }

  obtenerEvents(): Observable<EventDTO[]> {
    return this.http.get<EventDTO[]>(this.urlApi + 'events');
  }

  obtenerEventById(id: string): Observable<EventDTO> {
    return this.http.get<EventDTO>(this.urlApi + 'events/' + id);
  }

  updateEvent(idEvent: string, event: EventDTO): Observable<EventDTO> {
    return this.http.put<EventDTO>(this.urlApi + 'events/' + idEvent, event);
  }

  deleteEvent(eventId: string): Observable<deleteRes> {
    return this.http.delete<deleteRes>(this.urlApi + 'events/' + eventId);
  }
}
