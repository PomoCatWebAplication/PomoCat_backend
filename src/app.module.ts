import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { TasksModule } from './modules/tasks/tasks.module';
import {ConfigModule, ConfigService} from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true,}),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        uri: cfg.get('MONGODB_URI'),
        dbName: 'PomoCatDb',
        serverSelectionTimeoutMS: 5000,
      }),
    }),
    AuthModule,
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
