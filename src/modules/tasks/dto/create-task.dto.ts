import { IsEnum, IsNotEmpty, IsOptional} from 'class-validator';
import {IsDateString, IsString, IsNumber} from 'class-validator';

export enum TaskState {
    COMPLETED="COMPLETED",
    PENDING="PENDING",
}

export class CreateTaskDto {

    @IsNotEmpty()
    title: string;

    @IsOptional()
    description: string;

    @IsOptional()
    @IsEnum(TaskState)
    state: TaskState;

    @IsOptional()
    @IsString()
    notifyLocalTime?: string; // formato "HH:mm"

    @IsOptional()
    @IsNumber()
    dailyMinutes?: number;

    @IsOptional()
    @IsString()
    timezone?: string; // ej: "America/Bogota"

}
