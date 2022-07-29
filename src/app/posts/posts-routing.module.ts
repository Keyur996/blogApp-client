import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostAddEditComponent } from './post-add-edit/post-add-edit.component';
import { PostDataResolver } from './post-data.resolver';
import { PostsComponent } from './posts.component';

const routes: Routes = [
  { path: '', component: PostsComponent, pathMatch: 'full' },
  {
    path: 'new',
    component: PostAddEditComponent,
    resolve: {
      users: PostDataResolver,
    },
  },
  {
    path: 'edit/:id',
    component: PostAddEditComponent,
    resolve: {
      users: PostDataResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
