import { Module, Global } from '@nestjs/common';
import { FirestoreProvider } from './firestore.providers';

@Global()
@Module({
  providers: [FirestoreProvider],
  exports: [FirestoreProvider],
})
export class FirestoreModule {}
