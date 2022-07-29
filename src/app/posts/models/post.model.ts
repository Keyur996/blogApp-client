export interface IPost {
  _id?: string;
  title: string;
  description: string;
  images: string[] | File[];
  tags: string[];
  user: any;
}
