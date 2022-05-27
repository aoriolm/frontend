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
import { CitaService } from 'src/app/Services/cita.service';

@Component({
  selector: 'app-form-citas',
  templateUrl: './form-citas.component.html',
  styleUrls: ['./form-citas.component.sass'],
})
export class FormCitasComponent implements OnInit {
  signupCita: CitaDTO;
  newEvent: EventDTO;

  start: FormControl;
  duracion: FormControl;
  email: FormControl;
  nombre: FormControl;
  apellido1: FormControl;
  apellido2: FormControl;
  servicios: FormControl;
  tel1: FormControl;
  tel2: FormControl;

  citaForm: FormGroup;
  isValidForm: boolean | null;

  constructor(
    private formBuilder: FormBuilder,
    private citaService: CitaService,
    private router: Router
  ) {
    this.signupCita = new CitaDTO(
      new Date(),
      Number(null),
      '',
      '',
      '',
      '',
      [''],
      Number(null),
      Number(null)
    );

    this.newEvent = new EventDTO(new Date(), new Date(), '');
    this.isValidForm = null;

    this.start = new FormControl(
      formatDate(this.signupCita.start, 'yyyy-MM-dd', 'en'),
      [Validators.required]
    );

    this.duracion = new FormControl(this.signupCita.duracion, [
      Validators.required,
    ]);

    this.email = new FormControl(this.signupCita.email, [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]);

    this.nombre = new FormControl(this.signupCita.nombre, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25),
    ]);

    this.apellido1 = new FormControl(this.signupCita.apellido1, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25),
    ]);

    this.apellido2 = new FormControl(this.signupCita.apellido2, [
      Validators.minLength(5),
      Validators.maxLength(25),
    ]);

    this.servicios = new FormControl(this.signupCita.servicios, [
      Validators.required,
    ]);

    this.tel1 = new FormControl(this.signupCita.tel1, [
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(9),
    ]);

    this.tel2 = new FormControl(this.signupCita.tel2, [
      Validators.minLength(9),
      Validators.maxLength(9),
    ]);

    this.citaForm = this.formBuilder.group({
      start: this.start,
      duracion: this.duracion,
      email: this.email,
      nombre: this.nombre,
      apellido1: this.apellido1,
      apellido2: this.apellido2,
      servicios: this.servicios,
      tel1: this.tel1,
      tel2: this.tel2,
    });
  }

  ngOnInit(): void {}

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
    this.newEvent.end = new Date(
      new Date(this.signupCita.start).getTime() +
        this.signupCita.duracion * 60000
    );
    console.log(this.newEvent.end);
    this.newEvent.title = this.signupCita.servicios[0]; //hacer una funcion para concatenar todos los servicios
    console.log(this.newEvent.title);

    this.citaService.crearCita(this.signupCita).subscribe();
    this.citaService.crearEvent(this.newEvent).subscribe();

    //this.citaForm.reset();
    this.router.navigateByUrl('');
  }
}
