import { PostType } from './post-type.enum';

export default interface PostDto {
  Id: string;
  postType: PostType;
  Text: string;
  fileLocation: string;
  DateCreated: Date;
  Likes: any[];
  Dislikes: any[];
  Comments: any[];
  isLikedByPrincipal: boolean;
  PosterId: string;
}
