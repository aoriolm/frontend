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

  updateForm: FormGroup;
  isValidForm: boolean | null;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private router: Router
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

    this.email = new FormControl(this.updateUser.email, [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]);

    this.password = new FormControl(this.updateUser.password, [
      Validators.minLength(8),
    ]);

    this.nombre = new FormControl(this.updateUser.nombre, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25),
    ]);

    this.apellido1 = new FormControl(this.updateUser.apellido1, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25),
    ]);

    this.apellido2 = new FormControl(this.updateUser.apellido2, [
      Validators.minLength(5),
      Validators.maxLength(25),
    ]);

    this.nacimiento = new FormControl(
      formatDate(this.updateUser.nacimiento, 'yyyy-MM-dd', 'en'),
      [Validators.required]
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

    this.genero = new FormControl(this.updateUser.genero, [
      Validators.required,
    ]);

    this.rol = new FormControl(this.updateUser.rol, [Validators.required]);

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
    let responseError: any;

    // load user data
    const userId = this.localStorageService.get('id');
    if (userId) {
      this.userService.getUserById(userId).subscribe(
        (userData: UserDTO) => {
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
        } /*,
        (error: HttpErrorResponse) => {
          responseError = error.error;
          this.sharedService.errorLog(errorResponse);
        }*/
      );
    }
  }

  update(): void {
    this.isValidForm = false;
    const userId = this.localStorageService.get('id');
    console.log('Se ha llamado update, ahora hay que llamar al backend');

    if (this.updateForm.invalid) {
      return;
    }
    this.isValidForm = true;
    this.updateUser = this.updateForm.value;
    console.log(this.updateUser);

    if (userId) {
      this.userService.updateUser(userId, this.updateUser).subscribe();
      this.updateForm.reset();
      this.router.navigateByUrl('');
    } else {
      return;
    }
  }
}
