import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { UsersService } from '../users/users.service';

@Injectable({
  providedIn: 'root',
})
export class PostDataResolver implements Resolve<any> {
  constructor(private $user: UsersService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.$user.getAllUsersObservable(1, 100000);
  }
}
