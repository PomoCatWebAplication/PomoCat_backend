import { Module } from '@nestjs/common';
import { PomodoroService } from './pomodoro.service';
import { PomodoroController } from './pomodoro.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PomodoroSession, PomodoroSessionSchema } from './schemas/pomodoro.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PomodoroSession.name, schema: PomodoroSessionSchema }]),
  ],
  controllers: [PomodoroController],
  providers: [PomodoroService],
})
export class PomodoroModule {}
