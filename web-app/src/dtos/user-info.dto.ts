export default interface UserInfoDto {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  profilePictureLocation: string;
  profileDescription: string;
  isFollowedByPrincipal: boolean;
  isRequestedByPrincipal: boolean;
}
