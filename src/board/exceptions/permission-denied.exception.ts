import { HttpException, HttpStatus } from '@nestjs/common';

export class PermissionDeniedException extends HttpException {
  constructor(message?: string) {
    super(
      message || 'You do not have permission to perform this action',
      HttpStatus.FORBIDDEN,
    );
  }
}
