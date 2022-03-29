export class PasswordShortError implements Error {
  name: string;
  message: string;
  stack?: string | undefined;

  constructor() {
    this.name = 'PasswordShortError';
    this.message = 'Password must be at least 8 characters long.';
  }
}
