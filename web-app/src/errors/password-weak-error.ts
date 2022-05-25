export class PasswordWeakError implements Error {
  name: string;
  message: string;
  stack?: string | undefined;

  constructor() {
    this.name = 'PasswordWeakError';
    this.message = 'Password must contain at least one digit.';
  }
}
