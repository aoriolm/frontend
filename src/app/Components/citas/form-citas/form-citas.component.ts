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
  user: FormControl;
  servicio: FormControl;

  citaForm: FormGroup;
  isValidForm: boolean | null;

  userList: UserDTO[];
  serviciosList: ServicioDTO[];

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

    this.user = new FormControl([Validators.required]);

    this.servicio = new FormControl([Validators.required]);

    this.loadUsers();
    this.loadServicios();

    this.citaForm = this.formBuilder.group({
      start: this.start,
      user: this.user,
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
    console.log(this.signupCita);
    this.newEvent.start = this.signupCita.start;
    console.log(this.newEvent.start);
    console.log(this.signupCita.servicio);
    let servicioCargado = this.servicioService
      .getServicioById(this.signupCita.servicio)
      .subscribe();
    console.log(servicioCargado);
    /*this.newEvent.end = new Date(
      new Date(this.signupCita.start).getTime() +
        this.signupCita.duracion * 60000
    );*/
    console.log(this.newEvent.end);
    this.newEvent.title = this.signupCita.servicio; //hacer una funcion para concatenar todos los servicios
    console.log(this.newEvent.title);

    this.citaService.crearCita(this.signupCita).subscribe();
    this.citaService.crearEvent(this.newEvent).subscribe();

    //this.citaForm.reset();
    this.router.navigateByUrl('');
  }
}
