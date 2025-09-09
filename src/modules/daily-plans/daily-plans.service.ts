import { Injectable } from '@nestjs/common';
import { CreateDailyPlanDto } from './dto/create-daily-plan.dto';
import { UpdateDailyPlanDto } from './dto/update-daily-plan.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class DailyPlansService {

  overlap(astartTime: string, aendTime: string, bstartTime: string, bendTime: string): boolean {
    return (astartTime < bendTime) && (bstartTime < aendTime);
  }

  readDayOfWeek(day: number): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[day % 7];
  }

  async reminder(userId: string) {
    // Logic for sending reminders based on daily plans
    const plans = await this.findByUser(userId);
    plans.forEach(plan => {
      // Send reminder for each plan
      console.log(`Reminder for plan on day ${this.readDayOfWeek(plan.day)} from ${plan.startTime} to ${plan.endTime}`);
    });
  }

  constructor(@InjectModel('DailyPlan') private dailyPlanModel) {}

  async create(createDailyPlanDto: CreateDailyPlanDto, userId: string, taskId: string) {
    for (let plan of await this.findByUser(userId)) {
      if (this.overlap(plan.startTime, plan.endTime, createDailyPlanDto.startTime, createDailyPlanDto.endTime)) {
        throw new Error('Time overlap with existing plan');
      }
    }
    const createdDailyPlan = new this.dailyPlanModel({ ...createDailyPlanDto, userId, taskId });
    return createdDailyPlan.save();
  }

  findAll() {
    return this.dailyPlanModel.find().exec();
  }

  findOne(id: string) {
    return this.dailyPlanModel.findById(id).exec();
  }

  update(id: string, updateDailyPlanDto: UpdateDailyPlanDto) {
    return this.dailyPlanModel.findByIdAndUpdate(id, updateDailyPlanDto).exec();
  }

  remove(id: string) {
    return this.dailyPlanModel.findByIdAndRemove(id).exec();
  }

  findByUser(userId: string) {
    return this.dailyPlanModel.find({ userId: userId }).exec();
  }
}
