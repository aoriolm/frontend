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
      formatDate(this.signupCita.start, 'dd-MM-yyyyThh:mm', 'en'),
      [Validators.required]
    );

    this.user_id = new FormControl(null, [Validators.required]);

    this.servicio = new FormControl(null, [Validators.required]);

    this.idEvento = new FormControl(null, [Validators.required]);

    this.loadUsers();
    this.loadServicios();

    this.citaForm = this.formBuilder.group({
      start: this.start,
      user_id: this.user_id,
      servicio: this.servicio,
      idEvento: '',
    });
  }

  ngOnInit(): void {
    // update. si recibimos un parámetro es que es un update. Rellenamos los campos
    // del formulario con los datos de la cita
    if (this.citaId) {
      this.isUpdate = true;
      this.citaService.getCitabyId(this.citaId).subscribe((cita) => {
        let date = new Date(cita.start);
        //le quito la Z a la fecha para que no salga un warning
        //al cargar la fecha en el input. Tambien hay que restarle
        //la diferencia horaria con el GMT0 porque Mongo guarda
        //la fecha introducida en GMT0 y si no se hace se carga un horario
        // con 1 o 2 horas de diferencia.
        date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        this.start.setValue(date.toISOString().replace('Z', ''));
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
    });
  }

  loadServicios(): void {
    this.servicioService.obtenerServicios().subscribe((servicios) => {
      this.serviciosList = servicios;
    });
  }

  crearCita(): void {
    this.signupCita = this.citaForm.value;
    //Leo los datos del ususario y servicio escogidos en el form
    this.servicioService
      .getServicioById(this.signupCita.servicio)
      .subscribe((servicioLeido: ServicioDTO) => {
        this.userService
          .getUserById(this.signupCita.user_id)
          .subscribe((userLeido: UserDTO) => {
            //Ahora que tenemos estos datos guardamos la cita y el evento en la BD
            this.newEvent.start = this.signupCita.start;
            console.log('El valor de start es:', this.newEvent.start);
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

            this.citaService
              .crearEvent(this.newEvent)
              .subscribe((eventoCreado: EventDTO) => {
                //añadimos el id del evento a la cita
                this.signupCita.idEvento = eventoCreado._id;
                //Creamos la cita con el id del evento
                this.citaService.crearCita(this.signupCita).subscribe();
              });
          });
      });

    this.citaForm.reset();
  }

  editarCita(): void {
    this.servicioService
      .getServicioById(this.citaForm.value.servicio)
      .subscribe((servicioLeido: ServicioDTO) => {
        this.userService
          .getUserById(this.citaForm.value.user_id)
          .subscribe((userLeido: UserDTO) => {
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
            //Leer el evento que acabo de guardar para obtener el id
            //añadir el id del evento a la cita

            this.citaService
              .updateEvent(this.citaForm.value.idEvento, this.newEvent)
              .subscribe((eventoModificado: EventDTO) => {
                this.citaService
                  .updateCita(this.citaId, this.citaForm.value)
                  .subscribe(() => {
                    this.router.navigateByUrl('citas');
                  });
              });
          });
      });
  }

  guardarCita(): void {
    this.isValidForm = false;
    if (this.citaForm.invalid) {
      return;
    }
    this.isValidForm = true;
    if (this.isUpdate) {
      this.editarCita();
    } else {
      this.crearCita();
    }
  }
}
