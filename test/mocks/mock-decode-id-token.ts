import { DecodedIdToken } from 'firebase-admin/auth';

export const mockDecodedIdToken: DecodedIdToken = {
  uid: 'mock-uid',
  email: 'mock@example.com',
  name: 'Mock User',
  aud: 'test-project',
  auth_time: 1234567890,
  exp: 1234569999,
  firebase: {
    identities: {},
    sign_in_provider: 'google.com',
  },
  iat: 1234567890,
  iss: 'https://securetoken.google.com/test-project',
  sub: 'mock-uid',
};
