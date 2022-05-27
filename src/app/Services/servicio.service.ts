import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServicioDTO } from '../Models/servicio.dto';

@Injectable({
  providedIn: 'root',
})
export class ServicioService {
  private urlApi: string;

  constructor(private http: HttpClient) {
    this.urlApi = 'http://localhost:9000/Api/';
  }

  crearServicio(servicio: ServicioDTO): Observable<ServicioDTO> {
    return this.http.post<ServicioDTO>(this.urlApi + 'servicios', servicio);
  }

  obtenerServicios(): Observable<ServicioDTO[]> {
    return this.http.get<ServicioDTO[]>(this.urlApi + 'servicios');
  }
}
