import { Pipe, PipeTransform } from '@angular/core';
import { ServicioService } from '../Services/servicio.service';

@Pipe({
  name: 'mostrarServicio',
  pure: false,
})
export class MostrarServicioPipe implements PipeTransform {
  valor: string = '';
  firstTime: boolean = false;

  constructor(private servicioService: ServicioService) {}

  transform(value: string): string {
    if (!this.firstTime) {
      if (this.valor !== '') {
        this.firstTime = true;
      }
      this.servicioService.getServicioById(value).subscribe((servicio) => {
        this.valor = servicio.nombre;
      });
    }
    return this.valor;
  }
}
