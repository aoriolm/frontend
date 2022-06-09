import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CitaDTO } from 'src/app/Models/cita.dto';
import { MostrarServicioPipe } from 'src/app/Pipes/mostrar-servicio.pipe';
import { MostrarUsuarioPipe } from 'src/app/Pipes/mostrar-usuario.pipe';
import { CitaService } from 'src/app/Services/cita.service';

@Component({
  selector: 'app-list-citas',
  templateUrl: './list-citas.component.html',
  styleUrls: ['./list-citas.component.sass'],
})
export class ListCitasComponent implements OnInit {
  citas!: CitaDTO[];
  citasTexto!: CitaDTO[];
  nombreMostrar: string;
  mostrarUsuario: MostrarUsuarioPipe;
  mostrarServicio: MostrarServicioPipe;
  date: Date;

  constructor(private router: Router, private citaService: CitaService) {
    this.date = new Date();
    this.date.setDate(this.date.getDate() - 1);
    this.loadCitas();
  }

  ngOnInit(): void {}

  loadCitas(): void {
    this.citaService.obtenerCitas().subscribe((citas) => {
      // filtro las citas antiguas para no saturar la vista
      // tampoco tiene sentido modificar una cita pasada
      this.citas = citas.filter(
        (cita) => new Date(cita.start).getTime() > this.date.getTime()
      );
    });
  }

  createCita(): void {
    this.router.navigateByUrl('cita/');
  }

  updateCita(citaId: string): void {
    this.router.navigateByUrl('cita/' + citaId);
  }

  deleteCita(citaId: string, citaStart: Date, idEvento: string): void {
    let result = confirm(
      'Desea eliminar al cita con fecha: ' + citaStart + ' .'
    );
    if (result) {
      this.citaService.deleteEvent(idEvento).subscribe((response) => {
        if (response.deletedCount > 0) {
          this.citaService.deleteCita(citaId).subscribe((response1) => {
            if (response1.deletedCount > 0) {
              this.loadCitas();
            } else {
              //No se ha podido eliminar la cita
              return;
            }
          });
        } else {
          //No se ha podido eliminar el evento
          return;
        }
      });
    }
  }
}
