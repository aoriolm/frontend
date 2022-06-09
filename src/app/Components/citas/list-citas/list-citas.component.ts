import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CitaDTO } from 'src/app/Models/cita.dto';
import { MostrarServicioPipe } from 'src/app/Pipes/mostrar-servicio.pipe';
import { MostrarUsuarioPipe } from 'src/app/Pipes/mostrar-usuario.pipe';
import { CitaService } from 'src/app/Services/cita.service';
import { ServicioService } from 'src/app/Services/servicio.service';
import { UserService } from 'src/app/Services/user.service';

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

  constructor(
    private router: Router,
    private citaService: CitaService,
    private userService: UserService,
    private servicioService: ServicioService
  ) {
    this.date = new Date();
    this.date.setDate(this.date.getDate() - 1);
    this.loadCitas();
  }

  ngOnInit(): void {}

  loadCitas(): void {
    this.citaService.obtenerCitas().subscribe((citas) => {
      console.log('Start vale: ', new Date(citas[1].start).getTime());
      console.log('La fecha a comparar es: ', this.date.getTime());
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
    //this.router.navigateByUrl('/user/category/' + categoryId);
  }

  deleteCita(citaId: string, citaStart: Date, idEvento: string): void {
    let result = confirm(
      'Desea eliminar al cita con fecha: ' + citaStart + ' .'
    );
    if (result) {
      this.citaService.deleteEvent(idEvento).subscribe((response) => {
        console.log('Lo que devuelve eliminar evento: ', response);
        if (response.deletedCount > 0) {
          this.citaService.deleteCita(citaId).subscribe((response1) => {
            console.log('Lo que devuelve eliminar cita: ', response1);
            if (response1.deletedCount > 0) {
              console.log('Se cargan de nuevo las Citas');
              this.loadCitas();
            } else {
              console.log('No se ha podido eliminar la Cita');
              return;
            }
          });
        } else {
          console.log('No se ha podido eliminar el Evento');
          return;
        }
      });
    }
  }

  Mostrar(cita: CitaDTO): CitaDTO {
    this.userService.getUserById(cita.user_id).subscribe((userLeido) => {
      this.nombreMostrar =
        userLeido.nombre + ' ' + userLeido.apellido1 + ' / ' + userLeido.email;
      cita.user_id = this.nombreMostrar;
    });
    return cita;
  }
}
