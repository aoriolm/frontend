import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthDTO } from '../Models/auth.dto';

export interface AuthToken {
  id: string;
  accessToken: string;
  resOK: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlApi: string;
  private controller: string;

  constructor(private http: HttpClient) {
    this.controller = 'login';
    this.urlApi = 'http://localhost:9000/Api/' + this.controller;
  }

  login(auth: AuthDTO): Observable<AuthToken> {
    return this.http.post<AuthToken>(this.urlApi, auth);
  }
}
