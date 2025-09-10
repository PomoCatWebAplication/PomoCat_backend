import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DailyPlansService } from '../services/daily-plans.service';
import { CreateDailyPlanDto } from '../dto/create-daily-plan.dto';
import { UpdateDailyPlanDto } from '../dto/update-daily-plan.dto';

@Controller('daily-plans')
export class DailyPlansController {
  constructor(private readonly dailyPlansService: DailyPlansService) {}

  @Post('create/:userId/:taskId')
  create(@Body() createDailyPlanDto: CreateDailyPlanDto, @Param('userId') userId: string, @Param('taskId') taskId: string) {
    return this.dailyPlansService.create(createDailyPlanDto, userId, taskId);
  }

  @Get('getAll/:userId')
  findAll(@Param('userId') userId: string) {
    return this.dailyPlansService.findByUser(userId);
  }

  @Get('findOne/:id')
  findOne(@Param('id') id: string) {
    return this.dailyPlansService.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateDailyPlanDto: UpdateDailyPlanDto) {
    return this.dailyPlansService.update(id, updateDailyPlanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dailyPlansService.remove(id);
  }

  @Get('reminder/:userId')
  reminder(@Param('userId') userId: string) {
    return this.dailyPlansService.reminder(userId);
  }

  @Get('allUserPlans/:userId')
  allUserPlans(@Param('userId') userId: string) {
    return this.dailyPlansService.findByUser(userId);
  
  }
}
