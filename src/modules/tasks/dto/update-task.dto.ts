import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto, TaskState } from './create-task.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {

    @IsNotEmpty()
    title: string;

    description: string;

    dueDate: Date;

    state: TaskState;
}
