import {IsDateString, IsEnum, IsNotEmpty, IsOptional} from 'class-validator';

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

}
