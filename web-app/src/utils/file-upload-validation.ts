import { InvalidFileTypeError } from '../errors/invalid-file-type.error';

export class FileUploadValidation {
  public validateFile(file: File) {
    if (!this.isFileTypeValid(file)) {
      throw new InvalidFileTypeError();
    }
  }

  private isFileTypeValid(file: File): boolean {
    const extension = this.getFileExtension(file);
    return extension === 'png' || extension === 'jpg' || extension === 'jpeg';
  }
  private getFileExtension(file: File): string {
    return file.type.split('/')[1];
  }
}
