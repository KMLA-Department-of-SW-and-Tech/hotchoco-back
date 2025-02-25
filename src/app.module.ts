import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BoardModule } from './board/board.module';
import { initializeFirebase } from './firebase.config';
import { FirestoreModule } from './firestore/firestore.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    UserModule,
    FirestoreModule,
    BoardModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    initializeFirebase();
  }
}
