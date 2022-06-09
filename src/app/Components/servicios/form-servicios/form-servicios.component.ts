import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  servicioId: string | null;
  isUpdate: boolean | null;

  constructor(
    private formBuilder: FormBuilder,
    private servicioService: ServicioService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.signupServicio = new ServicioDTO('', '', null, null);
    this.isValidForm = null;
    this.servicioId = this.activatedRoute.snapshot.paramMap.get('id');
    this.isUpdate = null;

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

  ngOnInit(): void {
    if (this.servicioId) {
      this.isUpdate = true;
      console.log('El servicio que queremos cargar es: ', this.servicioId);
      this.servicioService
        .getServicioById(this.servicioId)
        .subscribe((servicio) => {
          console.log('El servicio que se ha leido es: ', servicio);
          this.nombre.setValue(servicio.nombre);
          this.descripcion.setValue(servicio.descripcion);
          this.precio.setValue(servicio.precio);
          this.duracion.setValue(servicio.duracion);

          this.servicioForm = this.formBuilder.group({
            nombre: this.nombre,
            descripcion: this.descripcion,
            precio: this.precio,
            duracion: this.duracion,
          });
        });
    }
  }

  crearServicio(): void {
    console.log('Se ha llamado crearServicio, ahora hay que llamar al backend');

    /*if (this.servicioForm.invalid) {
      console.log('El formulario es inválido', this.servicioForm.invalid);
      return;
    }*/

    this.signupServicio = this.servicioForm.value;
    console.log(this.signupServicio);

    this.servicioService.crearServicio(this.signupServicio).subscribe();
    this.servicioForm.reset();
  }

  editarSercicio(): void {
    console.log('UPDATE servicioid: ', this.servicioId);
    console.log(
      'UPDATE valor de servicioForm al entrar en editarServicio: ',
      this.servicioForm.value
    );
    this.servicioService
      .updateServicio(this.servicioId, this.servicioForm.value)
      .subscribe((servicioModificado: ServicioDTO) => {
        console.log('UPDATE El servicio modificiado es: ', servicioModificado);
        this.router.navigateByUrl('servicios');
      });
  }

  guardarServicio(): void {
    this.isValidForm = false;
    if (this.servicioForm.invalid) {
      console.log(
        'El formulario es inválido en guardar servicio',
        this.servicioForm.invalid
      );
      return;
    }

    this.isValidForm = true;
    if (this.isUpdate) {
      console.log('Se va a llamar a editarServicio');
      this.editarSercicio();
    } else {
      console.log('Se va a llamar a crearServicio');
      this.crearServicio();
    }
  }
}
