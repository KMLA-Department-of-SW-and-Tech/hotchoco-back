// test/mocks/mock-firebase-auth.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { DecodedIdToken } from 'firebase-admin/auth';
import { mockDecodedIdToken } from './mock-decode-id-token';

interface CustomRequest extends Request {
  user: DecodedIdToken;
}

@Injectable()
export class MockFirebaseAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<CustomRequest>();
    request.user = mockDecodedIdToken;
    return true;
  }
}
