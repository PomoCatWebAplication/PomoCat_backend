import {IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString, IsNumber} from 'class-validator';

export enum TaskState {
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
}

export class CreateTaskDto {

    @IsNotEmpty()
    title: string;

    @IsOptional()
    description: string;

    @IsDateString()
    @IsOptional()
    dueDate: Date;

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
