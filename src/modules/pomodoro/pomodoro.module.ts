import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PomodoroSession, PomodoroSessionSchema } from './schemas/pomodoro.schema';
import { PomodoroController } from './controllers/pomodoro.controller';
import { PomodoroService } from './services/pomodoro.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PomodoroSession.name, schema: PomodoroSessionSchema }]),
  ],
  controllers: [PomodoroController],
  providers: [PomodoroService],
})
export class PomodoroModule {}
