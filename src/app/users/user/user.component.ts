import {Component, input, Input, OnDestroy, OnInit} from '@angular/core';
import {User} from "../models/user.model";
import {UserService} from "../services/user.service";
import {UserStateService} from "../services/user-state.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription()
  @Input()  userId: number = -1
  protected user: User | null = null

  constructor(
    public userService: UserService,
    public userState: UserStateService,
  ) { }

  ngOnInit() {
    this.subscriptions.add(
      this.userService.getUser(this.userId).subscribe({
        next: (user) => {
          this.user = user
        },
        error: (error) => {
          this.userState.setError(error)
        },
        complete: () => {
          this.userState.setLoading(false)
        }
      })
    )
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }
}
