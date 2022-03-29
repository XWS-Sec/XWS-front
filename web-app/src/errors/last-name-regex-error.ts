export class LastNameRegexError implements Error {
  name: string;
  message: string;
  stack?: string | undefined;

  constructor() {
    this.name = 'LastNameRegexError';
    this.message = 'Last name can only contain letters.';
  }
}
