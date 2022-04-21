import UserInfoDto from '../dtos/user-info.dto';

export default interface FollowRequest {
  id: string;
  sender: UserInfoDto;
}
