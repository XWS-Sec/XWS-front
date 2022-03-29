export class EmailTakenError implements Error {
  name: string;
  message: string;
  stack?: string | undefined;

  constructor() {
    this.name = 'EmailTakenError';
    this.message = 'An account with such email already exists.';
  }
}
