import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { IUser } from './models/user.model';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: IUser[] = [];
  private usersSub!: Subscription;
  totalUsers: number = 0;
  usersPerpage: number = 2;
  currentPage: number = 1;
  pageSizeOptions = [1, 2, 5, 10];

  constructor(private $user: UsersService) {}

  ngOnInit(): void {
    this.$user.getAllUsers(this.currentPage, this.usersPerpage);
    this.usersSub = this.$user
      .getUsersUpdateListener()
      .subscribe(({ users, count }: { users: IUser[]; count: number }) => {
        console.log('Data', { users, count });
        this.users = users;
        this.totalUsers = count;
      });
  }

  onDelete(user: IUser) {
    this.$user.deleteUser(user._id!).subscribe({
      next: (res) => {
        this.$user.getAllUsers(this.currentPage, this.usersPerpage);
      },
    });
  }

  pageChanged(event: PageEvent) {
    this.$user.getAllUsers(event.pageIndex + 1, event.pageSize);
  }
}
