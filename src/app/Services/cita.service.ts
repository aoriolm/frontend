import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CitaDTO } from '../Models/cita.dto';

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
}
