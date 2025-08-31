import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { TasksModule } from './modules/tasks/tasks.module';

@Module({
  imports: [AuthModule, TasksModule],
})
export class AppModule {}
