import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  private usersSubject = new BehaviorSubject<User[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);
  users$: Observable<User[]> = this.usersSubject.asObservable();
  loading$: Observable<boolean> = this.loadingSubject.asObservable();
  error$: Observable<string | null> = this.errorSubject.asObservable();

  constructor() { }

  setUsers(users: User[]) {
    this.usersSubject.next(users);
  }

  addUser(newUser: User) {
    this.usersSubject.next([...this.usersSubject.value, newUser]);
  }

  updateUser(user: User){
    let users: User[] = this.usersSubject.value;
    let newUsers: User[] = []

    users.forEach(p => {
      if(p.id != user.id) newUsers.push(p)
      else newUsers.push(user)
    })

    this.usersSubject.next(newUsers)
  }

  deleteUser(user: User){
    let users: User[] = this.usersSubject.value;
    let newUsers: User[] = []

    users.forEach(p => {
      if(p.id != user.id) newUsers.push(p)
    })

    this.usersSubject.next(newUsers)
  }

  setLoading(loading: boolean) {
    this.loadingSubject.next(loading);
  }

  setError(error: string | null) {
    this.errorSubject.next(error);
  }
}
