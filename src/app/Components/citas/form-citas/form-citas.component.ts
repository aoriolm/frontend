import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  idEvento: FormControl;

  citaForm: FormGroup;
  isValidForm: boolean | null;
  isUpdate: boolean | null;

  userList: UserDTO[];
  serviciosList: ServicioDTO[];
  servicioDevuelto: ServicioDTO;

  private citaId: string | null;

  constructor(
    private formBuilder: FormBuilder,
    private citaService: CitaService,
    private userService: UserService,
    private servicioService: ServicioService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.signupCita = new CitaDTO(new Date(), '', '', '');

    this.newEvent = new EventDTO(new Date(), new Date(), '');
    this.isValidForm = null;
    this.isUpdate = null;

    this.citaId = this.activatedRoute.snapshot.paramMap.get('id');

    this.start = new FormControl(
      formatDate(this.signupCita.start, 'yyyy-MM-ddThh:mm', 'en'),
      [Validators.required]
    );

    this.user_id = new FormControl([Validators.required]);

    this.servicio = new FormControl([Validators.required]);

    this.idEvento = new FormControl([Validators.required]);

    this.loadUsers();
    this.loadServicios();

    this.citaForm = this.formBuilder.group({
      start: this.start,
      user_id: this.user_id,
      servicio: this.servicio,
      idEvento: this.idEvento,
    });
  }

  ngOnInit(): void {
    // update. si recibimos un parámetro es que es un update. Rellenamos los campos
    // del formulario con los datos de la cita
    if (this.citaId) {
      this.isUpdate = true;
      console.log('La cita que queremos cargar es: ', this.citaId);
      this.citaService.getCitabyId(this.citaId).subscribe((cita) => {
        console.log('La cita que se ha leido es: ', cita);
        this.start.setValue(
          new Date(cita.start).toISOString().replace('Z', '')
        );
        this.user_id.setValue(cita.user_id);
        this.servicio.setValue(cita.servicio);
        this.idEvento.setValue(cita.idEvento);

        this.citaForm = this.formBuilder.group({
          start: this.start,
          user_id: this.user_id,
          servicio: this.servicio,
          idEvento: this.idEvento,
        });
      });
    }
  }

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
    this.signupCita = this.citaForm.value;
    console.log('Esta es la cita: ', this.signupCita);
    console.log('Este es la fecha de la cita: ', this.signupCita.start);
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
            //this.citaService.crearCita(this.signupCita).subscribe();
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
            //Leer el evento que acabo de guardar para obtener el id
            //añadir el id del evento a la cita

            this.citaService
              .crearEvent(this.newEvent)
              .subscribe((eventoCreado: EventDTO) => {
                console.log(
                  'Esto es lo que devuelve crear evento: ',
                  eventoCreado
                );
                //añadimos el id del evento a la cita
                this.signupCita.idEvento = eventoCreado._id;
                console.log(
                  'Esta es la cita que se va a crear: ',
                  this.signupCita
                );
                //Creamos la cita con el id del evento
                this.citaService
                  .crearCita(this.signupCita)
                  .subscribe((CitaCreada: CitaDTO) => {
                    console.log('Esta es la cita creada: ', CitaCreada);
                  });
              });
          });
      });

    this.citaForm.reset();
    //this.router.navigateByUrl('');
  }

  editarCita(): void {
    console.log('UPDATE citaid: ', this.citaId);
    console.log('UPDATE valor de citaForm: ', this.citaForm.value);
    this.servicioService
      .getServicioById(this.citaForm.value.servicio)
      .subscribe((servicioLeido: ServicioDTO) => {
        console.log('UPDATE El servicio leído es: ', servicioLeido);
        this.userService
          .getUserById(this.citaForm.value.user_id)
          .subscribe((userLeido: UserDTO) => {
            console.log('UPDATE El usuario leído es: ', userLeido);
            //Ahora que tenemos estos datos guardamos la cita y el evento en la BD
            //this.citaService.crearCita(this.signupCita).subscribe();
            this.newEvent.start = this.citaForm.value.start;
            this.newEvent.end = new Date(
              new Date(this.citaForm.value.start).getTime() +
                servicioLeido.duracion * 60000
            );
            this.newEvent.title =
              servicioLeido.nombre +
              ' / ' +
              userLeido.nombre +
              ' ' +
              userLeido.apellido1;
            console.log('UPDATE Datos del evento a guardar: ', this.newEvent);
            //Leer el evento que acabo de guardar para obtener el id
            //añadir el id del evento a la cita
            console.log(
              'UPDATE id del evento a modificar: ',
              this.citaForm.value.idEvento
            );
            this.citaService
              .updateEvent(this.citaForm.value.idEvento, this.newEvent)
              .subscribe((eventoModificado: EventDTO) => {
                console.log(
                  'UPDATE Esto es lo que devuelve updateEvent: ',
                  eventoModificado
                );
                console.log(
                  'UPDATE Esta es la cita que se va a crear: ',
                  this.citaForm.value
                );

                this.citaService
                  .updateCita(this.citaForm.value._id, this.citaForm.value)
                  .subscribe();
              });
          });
      });
  }

  guardarCita(): void {
    if (this.citaForm.invalid) {
      return;
    }

    if (this.isUpdate) {
      console.log('Se va a llamar a editarCita');
      this.editarCita();
    } else {
      this.crearCita();
    }
  }
}
