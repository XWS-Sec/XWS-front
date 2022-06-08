export default interface UserInfoDto {
  id: string;
  username: string;
  name: string;
  surname: string;
  profilePictureLocation: string;
  profileDescription: string;
  isFollowedByPrincipal: boolean;
  isRequestedByPrincipal: boolean;
}
