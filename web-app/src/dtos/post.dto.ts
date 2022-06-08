import { PostType } from './post-type.enum';
import UserInfoDto from './user-info.dto';

export default interface PostDto {
  id: string;
  postType: PostType;
  text: string;
  fileLocation: string;
  dateCreated: Date;
  likes: any[];
  dislikes: any[];
  comments: any[];
  isLikedByPrincipal: boolean;
  posterId: string;
}
