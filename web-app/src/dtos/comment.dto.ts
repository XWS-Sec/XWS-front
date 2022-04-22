import UserInfoDto from './user-info.dto';

export default interface CommentDto {
  id: number;
  postId: number;
  text: string;
  dateCreated: Date;
  user: UserInfoDto;
}
