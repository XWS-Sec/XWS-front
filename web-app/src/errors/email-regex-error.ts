export class EmailRegexError implements Error {
  name: string;
  message: string;
  stack?: string | undefined;

  constructor() {
    this.name = 'EmailRegexError';
    this.message = 'Invalid email format.';
  }
}
