import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { MaterialModule } from '../shared/material/material.module';
import { UserAddEditComponent } from './user-add-edit/user-add-edit.component';
import { UsersComponent } from './users.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [UserAddEditComponent, UsersComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    MaterialModule,
  ],
})
export class UsersModule {}
