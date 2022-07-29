import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  {
    path: 'users',
    loadChildren: async () =>
      (await import('./../users/users.module')).UsersModule,
  },
  {
    path: 'posts',
    loadChildren: async () =>
      (await import('./../posts/posts.module')).PostsModule,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
