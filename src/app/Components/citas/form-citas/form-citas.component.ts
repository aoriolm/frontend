import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CitaDTO } from 'src/app/Models/cita.dto';
import { EventDTO } from 'src/app/Models/event.dto';
import { ServicioDTO } from 'src/app/Models/servicio.dto';
import { UserDTO } from 'src/app/Models/user.dto';
import { CitaService } from 'src/app/Services/cita.service';
import { ServicioService } from 'src/app/Services/servicio.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-form-citas',
  templateUrl: './form-citas.component.html',
  styleUrls: ['./form-citas.component.sass'],
})
export class FormCitasComponent implements OnInit {
  signupCita: CitaDTO;
  newEvent: EventDTO;

  start: FormControl;
  user_id: FormControl;
  servicio: FormControl;

  citaForm: FormGroup;
  isValidForm: boolean | null;

  userList: UserDTO[];
  serviciosList: ServicioDTO[];
  servicioDevuelto: ServicioDTO;

  constructor(
    private formBuilder: FormBuilder,
    private citaService: CitaService,
    private userService: UserService,
    private servicioService: ServicioService,
    private router: Router
  ) {
    this.signupCita = new CitaDTO(new Date(), '', '');

    this.newEvent = new EventDTO(new Date(), new Date(), '');
    this.isValidForm = null;

    this.start = new FormControl(
      formatDate(this.signupCita.start, 'yyyy-MM-dd', 'en'),
      [Validators.required]
    );

    this.user_id = new FormControl([Validators.required]);

    this.servicio = new FormControl([Validators.required]);

    this.loadUsers();
    this.loadServicios();

    this.citaForm = this.formBuilder.group({
      start: this.start,
      user_id: this.user_id,
      servicio: this.servicio,
    });
  }

  ngOnInit(): void {}

  loadUsers(): void {
    this.userService.getUsers().subscribe((users) => {
      this.userList = users;
      console.log(users);
    });
  }

  loadServicios(): void {
    this.servicioService.obtenerServicios().subscribe((servicios) => {
      this.serviciosList = servicios;
    });
  }

  crearCita(): void {
    this.isValidForm = false;
    console.log('Se ha llamado crearCita, ahora hay que llamar al backend');

    if (this.citaForm.invalid) {
      return;
    }
    this.isValidForm = true;
    this.signupCita = this.citaForm.value;
    console.log('Esta es la cita: ', this.signupCita);
    console.log(
      'Este es el id del usuario en la cita ',
      this.signupCita.user_id
    );
    //Leo los datos del ususario y servicio escogidos en el form
    this.servicioService
      .getServicioById(this.signupCita.servicio)
      .subscribe((servicioLeido: ServicioDTO) => {
        console.log('El servicio leído es: ', servicioLeido);
        this.userService
          .getUserById(this.signupCita.user_id)
          .subscribe((userLeido: UserDTO) => {
            console.log('El usuario leído es: ', userLeido);
            //Ahora que tenemos estos datos guardamos la cita y el evento en la BD
            this.citaService.crearCita(this.signupCita).subscribe();
            this.newEvent.start = this.signupCita.start;
            this.newEvent.end = new Date(
              new Date(this.signupCita.start).getTime() +
                servicioLeido.duracion * 60000
            );
            this.newEvent.title =
              servicioLeido.nombre +
              ' / ' +
              userLeido.nombre +
              ' ' +
              userLeido.apellido1;
            console.log('El fin del evento es: ', this.newEvent.end);
            //Leer la cita que acabo de guardar para obtener el id
            //añadir el id de la cita al campo url del evento
            // modificar eventDTO
            this.citaService.crearEvent(this.newEvent).subscribe();
          });
      });

    this.citaForm.reset();
    //this.router.navigateByUrl('');
  }
}
