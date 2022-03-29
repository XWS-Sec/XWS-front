export class FirstNameRegexError implements Error {
  name: string;
  message: string;
  stack?: string | undefined;

  constructor() {
    this.name = 'FirstNameRegexError';
    this.message = 'First name can only contain letters.';
  }
}
