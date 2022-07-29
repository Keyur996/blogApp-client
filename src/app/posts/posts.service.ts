import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { IPost } from './models/post.model';

const BACKEND_URL = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private posts: IPost[] = [];
  private postUpdated: Subject<{ posts: IPost[]; count: number }> =
    new Subject<{ posts: IPost[]; count: number }>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  getAllPosts(page: number, limit: number) {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    this.http
      .get<{ success: boolean; data: IPost[]; results: number }>(
        `${BACKEND_URL}/posts`,
        { params: params }
      )
      .subscribe((response) => {
        this.posts = response.data;
        this.postUpdated.next({
          posts: [...this.posts],
          count: response.results,
        });
      });
  }

  createPost(post: IPost) {
    this.http
      .post<{ success: Boolean; data: IPost }>(`${BACKEND_URL}/posts`, post)
      .subscribe({
        next: (res) => {
          this.router.navigate(['home/posts'], { relativeTo: this.route });
        },
      });
  }

  getPostUpdateListner() {
    return this.postUpdated.asObservable();
  }

  deletePost(postId: string) {
    return this.http.delete<{
      success: boolean;
      data: null | undefined | unknown;
    }>(`${BACKEND_URL}/posts/${postId}`);
  }

  getPostById(postId: string) {
    return this.http.get<{ success: Boolean; data: IPost }>(
      `${BACKEND_URL}/posts/${postId}`
    );
  }

  updatePost(post: IPost, postId: string) {
    this.http
      .patch<{ success: boolean; data: IPost }>(
        `${BACKEND_URL}/posts/${postId}`,
        post
      )
      .subscribe((res) => {
        this.router.navigate(['home/posts'], { relativeTo: this.route });
      });
  }
}
