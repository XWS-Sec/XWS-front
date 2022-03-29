export class PasswordsDontMatchError implements Error {
  name: string;
  message: string;
  stack?: string | undefined;

  constructor() {
    this.name = 'PasswordsDontMatchError';
    this.message = 'Passwords must match.';
  }
}
