import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto, TaskState } from './create-task.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {

    @IsNotEmpty()

    @IsOptional()
    title: string;

    @IsOptional()
    description: string;

    @IsOptional()
    dueDate: Date;

    @IsOptional()
    state: TaskState;
}
