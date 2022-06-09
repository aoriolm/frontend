import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthDTO } from 'src/app/Models/auth.dto';
import { HeaderMenus } from 'src/app/Models/header-menus.dto';
import { AuthService, AuthToken } from 'src/app/Services/auth.service';
import { HeaderMenusService } from 'src/app/Services/header-menus.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  loginUser: AuthDTO;
  email: FormControl;
  password: FormControl;
  loginForm: FormGroup;

  isValidForm: boolean | null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private headerMenusService: HeaderMenusService
  ) {
    this.loginUser = new AuthDTO('', '', '', '');

    this.isValidForm = null;

    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]);

    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16),
    ]);

    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
    });
  }

  ngOnInit(): void {}

  login(): void {
    this.isValidForm = false;
    let responseOK: boolean = false;
    let responseError: any;
    console.log('Se ha llamado a login, ahora hay que llamar al backend');

    if (this.loginForm.invalid) {
      return;
    }
    this.isValidForm = true;
    this.loginUser = this.loginForm.value;
    console.log(this.loginUser);

    this.authService.login(this.loginUser).subscribe(
      (resp: AuthToken) => {
        responseOK = true;
        console.log('responseOK true');
        console.log(resp);
        this.loginUser.id = resp.id;
        this.loginUser.accessToken = resp.accessToken;

        this.localStorageService.set('id', this.loginUser.id);
        this.localStorageService.set('accessToken', this.loginUser.accessToken);

        const headerInfo: HeaderMenus = {
          showAuthSection: true,
          showNoAuthSection: false,
        };
        this.headerMenusService.headerManagement.next(headerInfo);
        this.loginForm.reset();
        this.router.navigateByUrl('calendar');
      },
      (error: HttpErrorResponse) => {
        responseOK = false;
        console.log('responseOK false');
        responseError = error.error;
        const headerInfo: HeaderMenus = {
          showAuthSection: false,
          showNoAuthSection: true,
        };
        this.headerMenusService.headerManagement.next(headerInfo);
      }
    );
    //this.loginForm.reset();
    //this.router.navigateByUrl('profile');
  }
}
