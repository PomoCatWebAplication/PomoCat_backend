import {IsNotEmpty} from 'class-validator';

export enum TaskState {
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
}

export class CreateTaskDto {

    @IsNotEmpty()
    title: string;

    description: string;

    dueDate: Date;

    state: TaskState;

}
