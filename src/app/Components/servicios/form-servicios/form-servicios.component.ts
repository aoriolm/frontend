import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ServicioDTO } from 'src/app/Models/servicio.dto';
import { ServicioService } from 'src/app/Services/servicio.service';

@Component({
  selector: 'app-form-servicios',
  templateUrl: './form-servicios.component.html',
  styleUrls: ['./form-servicios.component.sass'],
})
export class FormServiciosComponent implements OnInit {
  signupServicio: ServicioDTO;

  nombre: FormControl;
  descripcion: FormControl;
  precio: FormControl;
  duracion: FormControl;

  servicioForm: FormGroup;
  isValidForm: boolean | null;

  constructor(
    private formBuilder: FormBuilder,
    private servicioService: ServicioService,
    private router: Router
  ) {
    this.signupServicio = new ServicioDTO('', '', Number(null), Number(null));
    this.isValidForm = null;

    this.nombre = new FormControl(this.signupServicio.nombre, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25),
    ]);

    this.descripcion = new FormControl(this.signupServicio.descripcion, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(250),
    ]);

    this.precio = new FormControl(this.signupServicio.precio, [
      Validators.required,
    ]);

    this.duracion = new FormControl(this.signupServicio.duracion, [
      Validators.required,
    ]);

    this.servicioForm = this.formBuilder.group({
      nombre: this.nombre,
      descripcion: this.descripcion,
      precio: this.precio,
      duracion: this.duracion,
    });
  }

  ngOnInit(): void {}

  crearServicio(): void {
    this.isValidForm = false;
    console.log('Se ha llamado crearServicio, ahora hay que llamar al backend');

    if (this.servicioForm.invalid) {
      return;
    }
    this.isValidForm = true;
    this.signupServicio = this.servicioForm.value;
    console.log(this.signupServicio);

    this.servicioService.crearServicio(this.signupServicio).subscribe();
    this.servicioForm.reset();
    this.router.navigateByUrl('dashboard');
  }
}
