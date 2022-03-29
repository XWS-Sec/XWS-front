export class UsernameRegexError implements Error {
  name: string;
  message: string;
  stack?: string | undefined;

  constructor() {
    this.name = 'UsernameRegexError';
    this.message = 'Username can only contain letters, dots and underscores.';
  }
}
