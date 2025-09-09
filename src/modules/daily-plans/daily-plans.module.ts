import { Module } from '@nestjs/common';
import { DailyPlansService } from './daily-plans.service';
import { DailyPlansController } from './daily-plans.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'DailyPlan', schema: require('./schema/daily-plan.schema').DailyPlanSchema },
    ]),
  ],
  controllers: [DailyPlansController],
  providers: [DailyPlansService],
})
export class DailyPlansModule {}
