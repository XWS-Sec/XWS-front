import { Gender } from '../model/enums/gender.enum';

export default interface CreateUserDto {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  name: string;
  surname: string;
  dateOfBirth: string;
  gender: Gender;
  phoneNumber: string;
  isPrivate: boolean;
  // profileDescription: string;
}
