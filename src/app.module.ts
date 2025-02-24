import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BoardModule } from './board/board.module';
import { initializeFirebase } from './firebase.config';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    UserModule,
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
