export default interface CreateUserDto {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  isPrivate: boolean;
  profileDescription: string;
}
