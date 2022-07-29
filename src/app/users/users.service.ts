import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { IUser } from './models/user.model';

const BACKEND_URL = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private users: IUser[] = [];
  private usersUpdated: Subject<{ users: IUser[]; count: number }> =
    new Subject<{ users: IUser[]; count: number }>();
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  getAllUsers(page: number, limit: number) {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    this.http
      .get<{ success: boolean; data: IUser[]; results: number }>(
        `${BACKEND_URL}/users`,
        { params: params }
      )
      .subscribe((response) => {
        this.users = response.data;
        this.usersUpdated.next({
          users: [...this.users],
          count: response.results,
        });
      });
  }

  getUsersUpdateListener() {
    return this.usersUpdated.asObservable();
  }

  getUser(id: string) {
    return this.http.get<{ success: boolean; data: IUser }>(
      `${BACKEND_URL}/users/${id}`
    );
  }

  addUser(user: IUser) {
    this.http
      .post<{ success: boolean; data: IUser }>(`${BACKEND_URL}/users`, user)
      .subscribe((responseData) => {
        this.router.navigate(['home/users'], { relativeTo: this.route });
      });
  }

  updateUser(user: IUser, userId: string) {
    this.http
      .patch<{ success: boolean; data: IUser }>(
        `${BACKEND_URL}/users/${userId}`,
        user
      )
      .subscribe((res) => {
        this.router.navigate(['home/users'], { relativeTo: this.route });
      });
  }

  deleteUser(userId: string) {
    return this.http.delete<{
      success: boolean;
      data: null | undefined | unknown;
    }>(`${BACKEND_URL}/users/${userId}`);
  }

  getAllUsersObservable(page: number, limit: number) {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    return this.http.get<{ success: boolean; data: IUser[]; results: number }>(
      `${BACKEND_URL}/users`,
      { params: params }
    );
  }
}
