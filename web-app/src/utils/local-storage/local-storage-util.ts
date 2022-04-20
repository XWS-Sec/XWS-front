import { unsignedUser, User } from '../../context/auth-context';
import { Role } from '../../model/enums/role.enum';
import { LocalStorageItem } from './local-storage-item.enum';

class LocalStorageUtil {
  public getUser(): User {
    //const accessToken = this.getAccessToken();
    const username = this.getUsername();

    //if (accessToken) {
    if (username) {
      const user: User = {
        //accessToken: accessToken,
        loggedIn: true,
        id: this.getUserId(),
        username: this.getUsername(),
        role: this.getRole(),
      };

      return user;
    }

    return unsignedUser;
  }

  public setUser(user: User): void {
    //this.setAccessToken(user.accessToken);
    this.setUserId(user.id);
    this.setUsername(user.username);
    this.setRole(user.role);
  }

  // public getAccessToken(): string | null {
  //   return localStorage.getItem(LocalStorageItem.ACCESS_TOKEN);
  // }

  // public setAccessToken(value: string): void {
  //   localStorage.setItem(LocalStorageItem.ACCESS_TOKEN, value);
  // }

  public getUserId(): number {
    const userIdStr = localStorage.getItem(LocalStorageItem.USER_ID);
    return userIdStr ? parseInt(userIdStr) : -1;
  }

  public setUserId(value: number): void {
    localStorage.setItem(LocalStorageItem.USER_ID, value.toString());
  }

  public getUsername(): string {
    const username = localStorage.getItem(LocalStorageItem.USERNAME);
    return username ? username : '';
  }

  public setUsername(value: string): void {
    localStorage.setItem(LocalStorageItem.USERNAME, value);
  }
  public getRole(): Role {
    const roleStr = localStorage.getItem(LocalStorageItem.ROLE);

    if (roleStr) {
      return roleStr as Role;
    }

    return Role.UNDEFINED;
  }

  public setRole(role: Role): void {
    localStorage.setItem(LocalStorageItem.ROLE, role);
  }
}

const localStorageUtil = new LocalStorageUtil();
export default localStorageUtil;
