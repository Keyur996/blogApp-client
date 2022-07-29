import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAddEditComponent } from './user-add-edit/user-add-edit.component';
import { UsersComponent } from './users.component';

const routes: Routes = [
  { path: '', component: UsersComponent, pathMatch: 'full' },
  { path: 'new', component: UserAddEditComponent },
  { path: 'edit/:id', component: UserAddEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
