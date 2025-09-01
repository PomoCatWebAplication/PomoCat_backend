import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { TasksModule } from './modules/tasks/tasks.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://yurayt18_db_user:C8pVC4cNrqYUotGX@pomocatdb.eivsfs9.mongodb.net/?retryWrites=true&w=majority&appName=PomoCatDb'),
    AuthModule,
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
