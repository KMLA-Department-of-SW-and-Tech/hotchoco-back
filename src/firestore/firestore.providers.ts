import { Firestore } from '@google-cloud/firestore';
import serviceAccountKey from '../serviceAccountKey.json';

export const FirestoreProvider = {
  provide: 'FIRESTORE',
  useFactory: () => {
    return new Firestore({
      projectId: serviceAccountKey.project_id,
      keyFilename: '../serviceAccountKey.json',
    });
  },
};
