export class NameRegexError implements Error {
  name: string;
  message: string;
  stack?: string | undefined;

  constructor() {
    this.name = 'NameRegexError';
    this.message = 'Name can only contain letters.';
  }
}
