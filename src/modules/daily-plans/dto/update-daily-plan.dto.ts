import { PartialType } from '@nestjs/mapped-types';
import { CreateDailyPlanDto, dayOfWeek } from './create-daily-plan.dto';
import { IsEnum, IsDate, IsOptional, IsString } from 'class-validator';

export class UpdateDailyPlanDto extends PartialType(CreateDailyPlanDto) {

    @IsEnum(dayOfWeek)
    day?: dayOfWeek;
    
    @IsDate()
    startTime?: string;
    
    @IsDate()
    endTime?: string;
    
    @IsOptional()
    @IsString()
    timezone?: string;

}
