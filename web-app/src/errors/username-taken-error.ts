export class UsernameTakenError implements Error {
  name: string;
  message: string;
  stack?: string | undefined;

  constructor() {
    this.name = 'UsernameTakenError';
    this.message = 'Username is already taken.';
  }
}
