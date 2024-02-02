import { Injectable } from '@angular/core';
import {UserStateService} from "./user-state.service";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private server: string = "http://localhost:5275/api/v1/Users";

  constructor(private http: HttpClient, private userState: UserStateService) { }

  getUsers(): Observable<User[]> {
    this.userState.setLoading(true)
    return this.http.get<User[]>(this.server + "/all")
  }

  getUser(userId: number): Observable<User> {
    this.userState.setLoading(true)
    return this.http.get<User>(this.server + `/user/${userId}`)
  }
}
