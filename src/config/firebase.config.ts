import { ConfigService } from '@nestjs/config';
import { initializeApp, cert } from 'firebase-admin/app';

export const initializeFirebase = (configService: ConfigService) => {
  const projectId = configService.get<string>('firebase.projectId');
  const clientEmail = configService.get<string>('firebase.clientEmail');
  const privateKey = configService.get<string>('firebase.privateKey');

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error('Firebase configuration is missing');
  }

  initializeApp({
    credential: cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });
};
