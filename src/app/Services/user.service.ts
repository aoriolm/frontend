import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDTO } from '../Models/user.dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private urlApi: string;
  private controller: string;
  constructor(private http: HttpClient) {
    this.controller = 'signup';
    this.urlApi = 'http://localhost:9000/Api/' + this.controller;
  }

  signUp(user: UserDTO): Observable<UserDTO> {
    return this.http.post<UserDTO>(this.urlApi, user);
    //.pipe(catchError(this.sharedService.handleError));
  }
}
