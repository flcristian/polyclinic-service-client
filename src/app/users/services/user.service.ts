import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/user.model";
import {CreateUserRequest} from "../models/create-user-request.model";
import {UpdateUserRequest} from "../models/update-user-request.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private server: string = "http://localhost:5275/api/v1/Users";

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.server + "/all")
  }

  getUser(userId: number): Observable<User> {
    return this.http.get<User>(this.server + `/user/${userId}`)
  }

  createUser(newUser: CreateUserRequest): Observable<User> {
    return this.http.post<User>(`${this.server}/create`, newUser)
  }

  updateUser(updatedUser: UpdateUserRequest): Observable<User> {
    return this.http.put<User>(`${this.server}/update`, updatedUser)
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${this.server}/delete/${id}`)
  }
}
