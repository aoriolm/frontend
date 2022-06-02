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
    this.router.navigateByUrl('servicio/');
  }

  updateServicio(id: string): void {
    this.router.navigateByUrl('servicio/' + id);
  }

  deleteServicio(servicioId: string, servicioNombre: string): void {
    let result = confirm(
      'Desea eliminar el servicio con el nombre: ' + servicioNombre + ' .'
    );
    if (result) {
      this.servicioService.deleteServicio(servicioId).subscribe((response) => {
        console.log('Lo que devuelve eliminar evento: ', response);
        if (response.deletedCount > 0) {
          this.loadServicios();
        } else {
          console.log('No se ha podido eliminar el servicio');
          return;
        }
      });
    }
    //this.router.navigateByUrl('form-citas');
  }
}
