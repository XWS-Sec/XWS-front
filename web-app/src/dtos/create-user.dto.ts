import { Gender } from '../model/enums/gender.enum';

export default interface CreateUserDto {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: Gender;
  phoneNumber: string;
  isPrivate: boolean;
  profileDescription: string;
}
