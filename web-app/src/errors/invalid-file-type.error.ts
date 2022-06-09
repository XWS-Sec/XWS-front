export class InvalidFileTypeError implements Error {
  name: string;
  message: string;
  stack?: string | undefined;

  constructor() {
    this.name = 'InvalidFileTypeError';
    this.message = 'Only .png, .jpg, and .jpeg files are accepptable.';
  }
}
