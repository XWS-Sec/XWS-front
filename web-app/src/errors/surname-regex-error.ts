export class SurnameRegexError implements Error {
  name: string;
  message: string;
  stack?: string | undefined;

  constructor() {
    this.name = 'SurameRegexError';
    this.message = 'Surname can only contain letters.';
  }
}
