import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../models/user.model";
import {UserState} from "./user-state";


@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  private stateSubject = new BehaviorSubject<UserState>({
    users: [],
    loading: false,
    error: null
  });
  state$: Observable<UserState> = this.stateSubject.asObservable();

  constructor() { }

  setUsers(users: User[]) {
    this.setState({users})
  }

  addUser(newUser: User) {
    let users: User[] = [...this.stateSubject.value.users, newUser]
    this.setState({users})
  }

  updateUser(user: User){
    let oldUsers: User[] = this.stateSubject.value.users;
    let users: User[] = []

    oldUsers.forEach(p => {
      if(p.id != user.id) users.push(p)
      else users.push(user)
    })

    this.setState({users})
  }

  deleteUser(user: User){
    let oldUsers: User[] = this.stateSubject.value.users
    let users: User[] = []

    oldUsers.forEach(p => {
      if(p.id != user.id) users.push(p)
    })

    this.setState({users})
  }

  setLoading(loading: boolean) {
    this.setState({loading})
  }

  setError(error: string | null) {
    this.setState({error});
  }

  setState(partialState: Partial<UserState>){
    this.stateSubject.next({...this.stateSubject.value,...partialState})
  }
}
