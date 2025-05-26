import { HttpException, HttpStatus } from '@nestjs/common';

export class NotOwnerException extends HttpException {
  constructor(message?: string) {
    super(
      message || 'You must be the owner to perform this action',
      HttpStatus.FORBIDDEN,
    );
  }
}
