import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../models/user.model";
import {UserState} from "./user-state";
import {UserService} from "./user.service";
import {CreateUserRequest} from "../models/create-user-request.model";
import {UpdateUserRequest} from "../models/update-user-request.model";

@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  private stateSubject = new BehaviorSubject<UserState>({
    users: [],
    loading: false,
    error: null,
    selectedUser: null
  });
  state$: Observable<UserState> = this.stateSubject.asObservable();

  constructor(private service: UserService) { }

  // Service calls

  createUser(request: CreateUserRequest){
    this.setLoading(true)
    this.service.createUser(request).subscribe({
      next: (user) => {
        this.addUser(user)
      },
      error: (error) => {
        this.setError(error)
      },
      complete: () => {
        this.setLoading(false)
      }
    })
  }

  updateUser(request: UpdateUserRequest){
    this.setLoading(true)
    this.service.updateUser(request).subscribe({
      next: (user) => {
        this.editUser(user)
      },
      error: (error) => {
        this.setError(error)
      },
      complete: () => {
        this.setLoading(false)
      }
    })
  }

  deleteUser(id: number){
    this.setLoading(true)
    this.service.deleteUser(id).subscribe({
      next: (user) => {
        this.removeUser(user)
      },
      error: (error) => {
        this.setError(error)
      },
      complete: () => {
        this.setLoading(false)
      }
    })
  }

  getUser(id: number){
    this.setLoading(true)
    return this.service.getUser(id)
  }

  getUsers(){
    this.setLoading(true)
    return this.service.getUsers()
  }

  // State updaters

  addUser(newUser: User) {
    let users: User[] = [...this.stateSubject.value.users, newUser]
    this.setState({users})
  }

  removeUser(user: User){
    let oldUsers: User[] = this.stateSubject.value.users
    let users: User[] = []

    oldUsers.forEach(p => {
      if(p.id != user.id) users.push(p)
    })

    this.setState({users})
  }

  editUser(user: User){
    let oldUsers: User[] = this.stateSubject.value.users
    let users: User[] = []

    oldUsers.forEach(p => {
      users.push(p.id === user.id ? user : p);
    })

    this.setState({users})
  }

  // State setters

  setLoading(loading: boolean) {
    this.setState({loading})
  }

  setError(error: string | null) {
    this.setState({error});
  }

  setSelectedUser(selectedUser: User){
    this.setState({selectedUser})
  }

  setUsers(users: User[]) {
    this.setState({users})
  }

  setState(partialState: Partial<UserState>){
    this.stateSubject.next({...this.stateSubject.value,...partialState})
  }
}
