import { IPost } from 'src/app/posts/models/post.model';

export interface IUser {
  _id?: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: number;
  dob: Date;
  isActive?: boolean;
  posts?: IPost[];
}
