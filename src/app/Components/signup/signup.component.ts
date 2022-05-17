import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserDTO } from 'src/app/Models/user.dto';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass'],
})
export class SignupComponent implements OnInit {
  signupUser: UserDTO;

  email: FormControl;
  password: FormControl;
  nombre: FormControl;
  apellido1: FormControl;
  apellido2: FormControl;
  nacimiento: FormControl;
  tel1: FormControl;
  tel2: FormControl;
  genero: FormControl;
  rol: FormControl;

  signupForm: FormGroup;
  isValidForm: boolean | null;

  constructor(
    private formBuilder: FormBuilder,
    private UserService: UserService,
    private router: Router
  ) {
    this.signupUser = new UserDTO(
      '',
      '',
      '',
      '',
      '',
      new Date(),
      Number(null),
      Number(null),
      '',
      ''
    );
    this.isValidForm = null;

    this.email = new FormControl(this.signupUser.email, [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]);

    this.password = new FormControl(this.signupUser.password, [
      Validators.minLength(8),
    ]);

    this.nombre = new FormControl(this.signupUser.nombre, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25),
    ]);

    this.apellido1 = new FormControl(this.signupUser.apellido1, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25),
    ]);

    this.apellido2 = new FormControl(this.signupUser.apellido2, [
      Validators.minLength(5),
      Validators.maxLength(25),
    ]);

    this.nacimiento = new FormControl(
      formatDate(this.signupUser.nacimiento, 'yyyy-MM-dd', 'en'),
      [Validators.required]
    );

    this.tel1 = new FormControl(this.signupUser.tel1, [
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(9),
    ]);

    this.tel2 = new FormControl(this.signupUser.tel2, [
      Validators.minLength(9),
      Validators.maxLength(9),
    ]);

    this.genero = new FormControl(this.signupUser.genero, [
      Validators.required,
    ]);

    this.rol = new FormControl(this.signupUser.rol, [Validators.required]);

    this.signupForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
      nombre: this.nombre,
      apellido1: this.apellido1,
      apellido2: this.apellido2,
      nacimiento: this.nacimiento,
      tel1: this.tel1,
      tel2: this.tel2,
      genero: this.genero,
      rol: this.rol,
    });
  }

  ngOnInit(): void {}

  signup(): void {
    this.isValidForm = false;
    console.log('Se ha llamado singup, ahora hay que llamar al backend');

    if (this.signupForm.invalid) {
      return;
    }
    this.isValidForm = true;
    this.signupUser = this.signupForm.value;
    console.log(this.signupUser);

    this.UserService.signUp(this.signupUser).subscribe();
    this.signupForm.reset();
    this.router.navigateByUrl('');
  }
}
