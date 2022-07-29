import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { IPost } from './models/post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  posts: IPost[] = [];
  private postsSub!: Subscription;
  totalPosts: number = 0;
  postPerpage: number = 2;
  currentPage: number = 1;
  pageSizeOptions = [1, 2, 5, 10];

  constructor(private $posts: PostsService) {}

  ngOnInit(): void {
    this.$posts.getAllPosts(this.currentPage, this.postPerpage);
    this.postsSub = this.$posts
      .getPostUpdateListner()
      .subscribe(({ posts, count }: { posts: IPost[]; count: number }) => {
        console.log('Data', { posts, count });
        this.posts = posts;
        this.totalPosts = count;
      });
  }

  onDelete(post: IPost) {
    this.$posts.deletePost(post._id!).subscribe({
      next: (res) => {
        this.$posts.getAllPosts(this.currentPage, this.postPerpage);
      },
    });
  }

  pageChanged(event: PageEvent) {
    this.$posts.getAllPosts(event.pageIndex + 1, event.pageSize);
  }
}
