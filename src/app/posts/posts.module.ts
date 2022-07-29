import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './posts.component';
import { PostAddEditComponent } from './post-add-edit/post-add-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material/material.module';

@NgModule({
  declarations: [PostsComponent, PostAddEditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    PostsRoutingModule,
  ],
})
export class PostsModule {}
