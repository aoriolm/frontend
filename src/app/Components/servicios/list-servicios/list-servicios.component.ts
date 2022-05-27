import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServicioDTO } from 'src/app/Models/servicio.dto';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { ServicioService } from 'src/app/Services/servicio.service';

@Component({
  selector: 'app-list-servicios',
  templateUrl: './list-servicios.component.html',
  styleUrls: ['./list-servicios.component.sass'],
})
export class ListServiciosComponent {
  servicios!: ServicioDTO[];
  constructor(
    private router: Router,
    private servicioService: ServicioService,
    private localStorageService: LocalStorageService
  ) {
    this.loadServicios();
  }

  private loadServicios(): void {
    let errorResponse: any;
    this.servicioService.obtenerServicios().subscribe((servicios) => {
      this.servicios = servicios;
    });
  }

  createServicio(): void {
    this.router.navigateByUrl('form-servicios');
  }
}
