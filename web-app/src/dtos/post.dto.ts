import { PostType } from './post-type.enum';

export default interface PostDto {
  Id: string;
  HasPicture: boolean;
  Text: string;
  DateCreated: Date;
  Liked: any[];
  Disliked: any[];
  Comments: any[];
  PosterId: string;
}
