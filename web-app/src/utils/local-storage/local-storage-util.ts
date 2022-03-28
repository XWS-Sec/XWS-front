import { unsignedUser, User } from '../../context/auth-context';
import { LocalStorageItem } from './local-storage-item.enum';

class LocalStorageUtil {
  public getUser(): User {
    const accessToken = this.getAccessToken();

    if (accessToken) {
      const user: User = {
        accessToken: accessToken,
        loggedIn: true,
        id: this.getUserId(),
        username: this.getUsername(),
      };

      return user;
    }

    return unsignedUser;
  }

  public setUser(user: User): void {
    this.setAccessToken(user.accessToken);
    this.setUserId(user.id);
    this.setUsername(user.username);
  }

  public getAccessToken(): string | null {
    return localStorage.getItem(LocalStorageItem.ACCESS_TOKEN);
  }

  public setAccessToken(value: string): void {
    localStorage.setItem(LocalStorageItem.ACCESS_TOKEN, value);
  }

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
}

const localStorageUtil = new LocalStorageUtil();
export default localStorageUtil;
