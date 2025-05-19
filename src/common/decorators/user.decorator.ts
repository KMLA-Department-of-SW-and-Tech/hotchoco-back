// user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { DecodedIdToken } from 'firebase-admin/auth'; // Firebase Admin SDK에서 가져온 타입

interface CustomRequest extends Request {
  user: DecodedIdToken;
}

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<CustomRequest>();
    return request.user; // FirebaseAuthGuard에서 설정한 값
  },
);
