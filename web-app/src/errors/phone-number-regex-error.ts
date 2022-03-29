export class PhoneNumberRegexError implements Error {
  name: string;
  message: string;
  stack?: string | undefined;

  constructor() {
    this.name = 'PhoneNumberRegexError';
    this.message = 'Invalid phone number.';
  }
}
