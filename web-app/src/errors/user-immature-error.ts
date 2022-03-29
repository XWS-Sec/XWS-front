export class UserImmatureError implements Error {
  name: string;
  message: string;
  stack?: string | undefined;

  constructor() {
    this.name = 'UserImmatureError';
    this.message = 'You must be at least 12 years old.';
  }
}
