import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDTO } from '../Models/user.dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private urlApi: string;
  constructor(private http: HttpClient) {
    this.urlApi = 'http://localhost:9000/Api/';
  }

  signUp(user: UserDTO): Observable<UserDTO> {
    return this.http.post<UserDTO>(this.urlApi + 'signup', user);
    //.pipe(catchError(this.sharedService.handleError));
  }

  getUserById(userId: string): Observable<UserDTO> {
    return this.http.get<UserDTO>(this.urlApi + 'users/' + userId);
    //.pipe(catchError(this.sharedService.handleError));
  }

  updateUser(userId: string, user: UserDTO): Observable<UserDTO> {
    return this.http.put<UserDTO>(this.urlApi + 'users/' + userId, user);
  }

  getUsers(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(this.urlApi + 'users/');
    //.pipe(catchError(this.sharedService.handleError));
  }
}
