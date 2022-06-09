import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDTO } from 'src/app/Models/user.dto';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass'],
})
export class ProfileComponent implements OnInit {
  updateUser: UserDTO;

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

  userId: string | null;

  updateForm: FormGroup;
  isValidForm: boolean | null;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.updateUser = new UserDTO(
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

    this.userId = this.activatedRoute.snapshot.paramMap.get('id');

    this.email = new FormControl(this.updateUser.email, [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]);

    this.password = new FormControl(this.updateUser.password, [
      Validators.minLength(8),
      Validators.maxLength(16),
    ]);

    this.nombre = new FormControl(this.updateUser.nombre, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
    ]);

    this.apellido1 = new FormControl(this.updateUser.apellido1, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
    ]);

    this.apellido2 = new FormControl(this.updateUser.apellido2, [
      Validators.minLength(2),
      Validators.maxLength(20),
    ]);

    this.nacimiento = new FormControl(
      formatDate(this.updateUser.nacimiento, 'dd-MM-yyyy', 'en')
    );

    this.tel1 = new FormControl(this.updateUser.tel1, [
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(9),
    ]);

    this.tel2 = new FormControl(this.updateUser.tel2, [
      Validators.minLength(9),
      Validators.maxLength(9),
    ]);

    this.genero = new FormControl(this.updateUser.genero);

    this.rol = new FormControl(this.updateUser.rol);

    this.updateForm = this.formBuilder.group({
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

  ngOnInit(): void {
    if (!this.userId) {
      this.userId = this.localStorageService.get('id');
    }
    this.userService.getUserById(this.userId).subscribe((userData: UserDTO) => {
      this.email.setValue(userData.email);
      this.nombre.setValue(userData.nombre);
      this.apellido1.setValue(userData.apellido1);
      this.apellido2.setValue(userData.apellido2);
      this.nacimiento.setValue(
        formatDate(userData.nacimiento, 'yyyy-MM-dd', 'en')
      );
      this.tel1.setValue(userData.tel1);
      this.tel2.setValue(userData.tel2);
      this.genero.setValue(userData.genero);
      this.rol.setValue(userData.rol);

      this.updateForm = this.formBuilder.group({
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
    });
  }

  update(): void {
    this.isValidForm = false;

    if (this.updateForm.invalid) {
      return;
    }
    this.isValidForm = true;
    this.updateUser = this.updateForm.value;

    if (this.userId) {
      this.userService
        .updateUser(this.userId, this.updateUser)
        .subscribe((data) => {
          this.router.navigateByUrl('usuarios');
        });
    } else {
      return;
    }
  }
}
