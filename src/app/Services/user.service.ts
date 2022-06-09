import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDTO } from '../Models/user.dto';

interface deleteRes {
  deletedCount: number;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private urlApi: string;
  constructor(private http: HttpClient) {
    this.urlApi = 'https://sheyla-homs.herokuapp.com/Api/';
  }

  signUp(user: UserDTO): Observable<UserDTO> {
    return this.http.post<UserDTO>(this.urlApi + 'signup', user);
  }

  getUserById(userId: string): Observable<UserDTO> {
    return this.http.get<UserDTO>(this.urlApi + 'users/' + userId);
  }

  updateUser(userId: string, user: UserDTO): Observable<UserDTO> {
    return this.http.put<UserDTO>(this.urlApi + 'users/' + userId, user);
  }

  getUsers(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(this.urlApi + 'users/');
  }
  deleteUser(userId: string): Observable<deleteRes> {
    return this.http.delete<deleteRes>(this.urlApi + 'users/' + userId);
  }
}
