import { PostType } from './post-type.enum';
import UserInfoDto from './user-info.dto';

export default interface PostDto {
  id: string;
  postType: PostType;
  text: string;
  fileLocation: string;
  dateCreated: Date;
  likesCount: number;
  commentsCount: number;
  isLikedByPrincipal: boolean;
  user: UserInfoDto;
}
